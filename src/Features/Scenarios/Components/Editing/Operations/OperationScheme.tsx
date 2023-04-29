import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {IOperation} from "../../../Services/OperationsGenerator";

export default function OperationScheme() {

    const {operationId} = useParams();

    const [, setOperationUpdateState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const scheme = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.scheme;

    const handleSchemeUpdate = (event: SelectChangeEvent) => {

        setOperationUpdateState(p => {

            const oldOperation = {...scenarioWithChanges.operations.find(o => o.operationId === operationId) as IOperation};

            const newOperation = {
                operationId: oldOperation.operationId!,
                request: {
                    ...oldOperation.request!,
                    scheme: event.target.value
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
            <InputLabel id="operation-method-label">Scheme</InputLabel>
            <Select
                labelId="operation-method-label"
                value={scheme}
                label="Scheme"
                onChange={handleSchemeUpdate}
            >
                <MenuItem value={"http:"}>HTTP</MenuItem>
                <MenuItem value={"https:"}>HTTPS</MenuItem>
            </Select>
        </FormControl>

    );

}