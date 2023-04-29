import {ChangeEvent} from "react";
import {IOperation} from "../../../Services/OperationsGenerator";
import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

export default function OperationMethod() {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const method = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.method;

    const handleMethodUpdate = (event: SelectChangeEvent) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    method: event.target.value
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

        <FormControl fullWidth>
            <InputLabel id="operation-method-label">Method</InputLabel>
            <Select
                labelId="operation-method-label"
                value={method}
                label="Method"
                onChange={handleMethodUpdate}
            >
                <MenuItem value={"GET"}>GET</MenuItem>
                <MenuItem value={"POST"}>POST</MenuItem>
                <MenuItem value={"PUT"}>PUT</MenuItem>
                <MenuItem value={"PATCH"}>PATCH</MenuItem>
                <MenuItem value={"DELETE"}>DELETE</MenuItem>
                <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
            </Select>
        </FormControl>

    );

}