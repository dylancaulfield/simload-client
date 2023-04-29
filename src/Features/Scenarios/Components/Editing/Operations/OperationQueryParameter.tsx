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

export default function OperationQueryParameter(props: INameValueProps) {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};
            const oldQuery = oldOperation.request.query.at(props.index)!;

            const shouldUpdateName = event.target.name === "name";

            const newHeader = {
                name: shouldUpdateName ? event.target.value : oldQuery.name,
                value: !shouldUpdateName ? event.target.value : oldQuery.value,
            }

            const newQuerys = [...oldOperation.request.query];
            newQuerys[props.index] = newHeader;

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    query: newQuerys
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
                <TextField fullWidth={true} label={"Name"} name={"name"} onChange={handleQueryUpdate} value={props.value.name}/>
            </Grid>

            <Grid item sm={6}>
                <TextField fullWidth={true} label={"Value"} name={"value"} onChange={handleQueryUpdate} value={props.value.value}/>
            </Grid>

        </>
    );

}