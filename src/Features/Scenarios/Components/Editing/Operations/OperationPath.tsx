import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {ChangeEvent} from "react";
import {IOperation} from "../../../Services/OperationsGenerator";
import {TextField} from "@mui/material";

export default function OperationPath() {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const path = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.path;

    const handlePathChange = (event: ChangeEvent<HTMLInputElement>) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    path: event.target.value
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
        <TextField
            fullWidth={true}
            value={path}
            label="Path"
            onChange={handlePathChange}
        />
    );

}