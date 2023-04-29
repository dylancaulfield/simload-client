import {useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {ScenarioEditingWithChangesSelector} from "../../../State/ScenarioEditingState";
import {Grid} from "@mui/material";
import OperationHeader from "./OperationHeader";
import OperationQueryParameter from "./OperationQueryParameter";

export default function OperationQueryParameterList() {

    const {operationId} = useParams();

    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const query = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.query;

    return (
        <>

            <Grid container spacing={2}>
                {query?.map((q, i) => {
                    return <OperationQueryParameter key={i} index={i} value={q}/>
                })}
            </Grid>

        </>
    );

}