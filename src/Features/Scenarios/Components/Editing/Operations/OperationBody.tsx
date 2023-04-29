import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {ChangeEvent} from "react";
import {TextField} from "@mui/material";
import {IOperation} from "../../../Services/OperationsGenerator";

export default function OperationBody() {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const body = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.body;

    const handleBodyUpdate = (event: ChangeEvent<HTMLInputElement>) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    body: event.target.value
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
        <TextField minRows={10} fullWidth={true} multiline={true} value={body} onChange={handleBodyUpdate}></TextField>
    );

}