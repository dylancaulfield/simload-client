import {INameValueProps} from "./NameValue";
import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {ChangeEvent} from "react";
import {IOperation} from "../../../Services/OperationsGenerator";
import {Grid, TextField} from "@mui/material";

export default function OperationHeader(props: INameValueProps) {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const handleHeaderUpdate = (event: ChangeEvent<HTMLInputElement>) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};
            const oldHeader = oldOperation.request.headers.at(props.index)!;

            const shouldUpdateName = event.target.name === "name";

            const newHeader = {
                name: shouldUpdateName ? event.target.value : oldHeader.name,
                value: !shouldUpdateName ? event.target.value : oldHeader.value,
            }

            const newHeaders = [...oldOperation.request.headers];
            newHeaders[props.index] = newHeader;

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    headers: newHeaders
                },
                duration: oldOperation.duration!,
                originalRequest: oldOperation.originalRequest!,
                originalResponse: oldOperation.originalResponse!,
                time: oldOperation.time!,
                type: oldOperation.type!
            };

            return [...p.filter(o => o.operationId !== operationId), newOperation];

        });

    }

    return (
        <>

            <Grid item sm={6}>
                <TextField fullWidth={true} label={"Name"} name={"name"} onChange={handleHeaderUpdate} value={props.value.name}/>
            </Grid>

            <Grid item sm={6}>
                <TextField fullWidth={true} label={"Value"} name={"value"} onChange={handleHeaderUpdate} value={props.value.value}/>
            </Grid>

        </>
    );

}