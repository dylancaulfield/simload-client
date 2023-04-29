import ScenarioEditorScenariosDrawer from "../Components/Editing/ScenarioEditorScenariosDrawer";
import ScenarioCodeEditor from "../Components/Editing/Code/ScenarioCodeEditor";
import ScenarioEditorAppBar from "../Components/Editing/ScenarioEditorAppBar";
import {Grid} from "@mui/material";
import {useRecoilState} from "recoil";
import {ScenarioEditingInitialState} from "../State/ScenarioEditingState";
import {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import retrieveScenario from "../Services/RetrieveScenarioService";

/**
 * Manages the scenario editing view. Shows/hides the scenario list drawer.
 * Controls the visibility of the code and request editors
 * @constructor
 */
export default function ScenarioEditorView() {

    const [editorInitialState, setEditorInitialState] = useRecoilState(ScenarioEditingInitialState);

    const navigate = useNavigate();
    const {organisationId, projectId, scenarioId} = useParams();

    useEffect(() => {

        const retrieve = async () => {

            const scenario = await retrieveScenario(projectId!, scenarioId!);
            if (!scenario) {
                navigate(`/organisations/${organisationId}/projects/${projectId}`);
            }

            setEditorInitialState(scenario!);

        }

        retrieve();

        return function () {
            setEditorInitialState({
                code: "",
                operations: []
            });
        }

    }, []);

    return (
        <>

            <ScenarioEditorAppBar/>

            <ScenarioEditorScenariosDrawer/>

            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <ScenarioCodeEditor/>
                </Grid>
                <Grid item xs={6}>
                    <Outlet/>
                </Grid>
            </Grid>

        </>
    )

}