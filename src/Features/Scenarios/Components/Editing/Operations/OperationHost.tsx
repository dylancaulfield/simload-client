import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {SelectChangeEvent, TextField} from "@mui/material";
import {IOperation} from "../../../Services/OperationsGenerator";
import {ChangeEvent} from "react";

export default function OperationHost() {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const host = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.host;

    const handleHostChange = (event: ChangeEvent<HTMLInputElement>) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    host: event.target.value
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
            value={host}
            label="Host"
            onChange={handleHostChange}
        />
    );

}