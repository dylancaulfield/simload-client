import {useRecoilValue} from "recoil";
import {ScenarioEditingWithChangesSelector} from "../../../State/ScenarioEditingState";
import {useParams} from "react-router-dom";
import OperationHeader from "./OperationHeader";
import {Grid} from "@mui/material";

export default function OperationHeaderList() {

    const {operationId} = useParams();

    const scenarioWithChanges = useRecoilValue(ScenarioEditingWithChangesSelector);

    const headers = scenarioWithChanges.operations
        .find(o => o.operationId === operationId)?.request.headers;

    return (
        <>

            <Grid container spacing={2}>
                {headers?.map((h, i) => {
                    return <OperationHeader key={i} index={i} value={h}/>
                })}
            </Grid>

        </>
    );

}