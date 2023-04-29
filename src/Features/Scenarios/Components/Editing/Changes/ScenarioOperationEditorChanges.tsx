import {IOperation} from "../../../Services/OperationsGenerator";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingCreatedOperationsState,
    ScenarioEditingDeletedOperationsState,
    ScenarioEditingInitialState,
    ScenarioEditingUpdatedCodeState,
    ScenarioEditingUpdatedOperationsState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {Box, Button, Paper, Typography} from "@mui/material";
import UpdatedCode from "./UpdatedCode";
import CreatedOperation from "./CreatedOperation";
import UpdatedOperation from "./UpdatedOperation";
import DeletedOperation from "./DeletedOperation";
import {Save} from "@mui/icons-material";
import updateScenario, {IUpdateScenarioRequest} from "../../../Services/UpdateScenarioService";
import {useParams} from "react-router-dom";

export interface IOperationProps {
    operation: IOperation
}

export default function ScenarioOperationEditorChanges() {

    const [codeChangedState, setCodeChangedState] = useRecoilState(ScenarioEditingUpdatedCodeState);
    const [createdOperationsState, setCreatedOperationsState] = useRecoilState(ScenarioEditingCreatedOperationsState);
    const [updatedOperationsState, setUpdatedOperationsState] = useRecoilState(ScenarioEditingUpdatedOperationsState);
    const [deletedOperationsState, setDeletedOperationsState] = useRecoilState(ScenarioEditingDeletedOperationsState);

    const [, setInitialScenario] = useRecoilState(ScenarioEditingInitialState);
    const updatedScenario = useRecoilValue(ScenarioEditingWithChangesSelector);

    const anyChanges = codeChangedState || createdOperationsState.length > 0 || updatedOperationsState.length > 0 || deletedOperationsState.length > 0;

    const {projectId, scenarioId} = useParams();

    const handleSaveChanges = async () => {

        const request: IUpdateScenarioRequest = {
            projectId: projectId!,
            scenarioId: scenarioId!,
            code: updatedScenario.code,
            created: createdOperationsState,
            updated: updatedOperationsState,
            deleted: deletedOperationsState
        };

        const error = await updateScenario(request);
        if (error) {
            return console.log(error);
        }

        setInitialScenario(updatedScenario);
        setCodeChangedState(null);
        setCreatedOperationsState([]);
        setUpdatedOperationsState([]);
        setDeletedOperationsState([]);

    }

    return (
        <>

            <Box sx={{p: 3}}>

                <Typography sx={{mb: 3}} variant={"h4"} fontWeight={"bold"}>Pending Changes</Typography>

                {anyChanges &&
                    <>

                        <Paper elevation={3} sx={{p: 3, mb: 3}}>

                            <Typography sx={{mb: 3}} variant={"h5"} fontWeight={"bold"}>Pending Code
                                Changes</Typography>

                            <UpdatedCode/>

                        </Paper>

                        {createdOperationsState.map(o => <CreatedOperation operation={o} key={o.operationId}/>)}

                        <Paper elevation={3} sx={{p: 3, mb: 3}}>

                            <Typography sx={{mb: 3}} variant={"h5"} fontWeight={"bold"}>Pending Request
                                Changes</Typography>

                            {updatedOperationsState.map(o => <UpdatedOperation operation={o} key={o.operationId}/>)}

                        </Paper>


                        {deletedOperationsState.map(o => <DeletedOperation operation={o} key={o.operationId}/>)}

                        <Button onClick={handleSaveChanges} color={"secondary"} variant={"contained"} endIcon={<Save/>}>
                            Save Changes
                        </Button>

                    </>
                }

                {!anyChanges &&
                    <>

                        <Typography variant={"body1"}>
                            No changes have been made.
                        </Typography>

                        <Typography variant={"body1"}>
                            Hint: Place the cursor over a request
                            in the editor to make it appear in the request editor
                        </Typography>

                    </>
                }


            </Box>

        </>
    )

}