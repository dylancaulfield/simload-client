import {createBrowserRouter} from "react-router-dom";
import HomeView from "../Features/Home/Views/HomeView";
import SignUpView from "../Features/Users/Views/SignUpView";
import BeginSignInView from "../Features/Users/Views/BeginSignInView";
import ErrorPage from "../Features/Errors/Views/ErrorPage";
import ScenarioEditorView from "../Features/Scenarios/Views/ScenarioEditorView";
import ScenarioCreatorView from "../Features/Scenarios/Views/ScenarioCreatorView";
import ConfirmSignInView from "../Features/Users/Views/ConfirmSignInView";
import ProjectList from "../Features/Projects/Components/ProjectList";
import ProjectView from "../Features/Projects/Views/ProjectView";
import AuthenticatedRoute from "../Common/AuthenticatedRoute";
import OrganisationListView from "../Features/Organisations/Views/OrganisationListView";
import OrganisationView from "../Features/Organisations/Views/OrganisationView";
import LiveResultsView from "../Features/Results/Views/LiveResultsView";
import FinalResultsView from "../Features/Results/Views/FinalResultsView";
import ScenarioOperationEditor from "../Features/Scenarios/Components/Editing/Operations/ScenarioOperationEditor";
import ScenarioOperationEditorChanges
    from "../Features/Scenarios/Components/Editing/Changes/ScenarioOperationEditorChanges";
import CreateTestView from "../Features/Tests/Views/CreateTestView";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomeView/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/sign-in",
        element: <BeginSignInView/>
    },
    {
        path: "/sign-in/:session",
        element: <ConfirmSignInView/>
    },
    {
        path: "/sign-up",
        element: <SignUpView/>
    },
    {
        path: "/organisations",
        element: <AuthenticatedRoute><OrganisationListView/></AuthenticatedRoute>
    },
    {
        path: "/organisations/:organisationId",
        element: <AuthenticatedRoute><OrganisationView/></AuthenticatedRoute>
    },
    {
        path: "/organisations/:organisationId/projects",
        element: <AuthenticatedRoute><ProjectList/></AuthenticatedRoute>
    },
    {
        path: "/organisations/:organisationId/projects/:projectId",
        element: <AuthenticatedRoute><ProjectView/></AuthenticatedRoute>
    },
    {
        path: "/organisations/:organisationId/projects/:projectId/scenarios/create",
        element: <ScenarioCreatorView/>
    },
    {
        path: "/organisations/:organisationId/projects/:projectId/scenarios/:scenarioId",
        element: <ScenarioEditorView/>,
        children: [
            {
                path: "",
                element: <ScenarioOperationEditorChanges></ScenarioOperationEditorChanges>
            },
            {
                path: "operations/:operationId",
                element: <ScenarioOperationEditor/>
            }
        ]
    },
    {
        path: "/organisations/:organisationId/projects/:projectId/tests/start",
        element: <CreateTestView/>
    },
    {
        path: "/organisations/:organisationId/projects/:projectId/tests/:testId/live",
        element: <LiveResultsView/>
    },
    {
        path: "/organisations/:organisationId/projects/:projectId/tests/:testId/results",
        element: <FinalResultsView/>
    }

]);

export default Router;