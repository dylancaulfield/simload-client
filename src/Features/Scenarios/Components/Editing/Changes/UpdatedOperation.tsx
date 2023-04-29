import {IOperationProps} from "./ScenarioOperationEditorChanges";
import {ScenarioEditingUpdatedOperationsState} from "../../../State/ScenarioEditingState";
import {useRecoilState} from "recoil";
import {Link as RouterLink, useParams} from "react-router-dom";
import {Box, Button, Link} from "@mui/material";
import {Undo} from "@mui/icons-material";

export default function UpdatedOperation(props: IOperationProps) {

    const [, setUpdatedOperations] = useRecoilState(ScenarioEditingUpdatedOperationsState);

    const {organisationId, projectId, scenarioId} = useParams();

    const removeOperation = () => {
        setUpdatedOperations(p => {
            return p.filter(o => o.operationId !== props.operation.operationId)
        });
    }

    return (
        <>

            <Box sx={{mb: 3}}>
                <Link component={RouterLink}
                      to={`/organisations/${organisationId}/projects/${projectId}/scenarios/${scenarioId}/operations/${props.operation.operationId}`}>
                    {props.operation.operationId}
                </Link>

                <Button size="small" variant={"contained"} onClick={removeOperation} sx={{ml :3}} endIcon={<Undo/>}>Undo</Button>
            </Box>


        </>
    )

}