import {Container} from "@mui/material";
import React from "react";
import {useParams} from "react-router-dom";
import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import GeneralAppBar from "../../../Common/GeneralAppBar";
import {useRecoilState} from "recoil";
import {CreateScenarioFlow, ScenarioCreationState} from "../State/ScenarioCreationState";
import ScenarioCreateUpload from "../Components/Creating/ScenarioCreateUpload";
import ScenarioCreateFilter from "../Components/Creating/ScenarioCreateFilter";
import ScenarioCreateFinalise from "../Components/Creating/ScenarioCreateFinalise";

export default function ScenarioCreatorView() {

    const {organisationId, projectId} = useParams();
    const [scenarioCreateState] = useRecoilState(ScenarioCreationState);

    const component = () => {
        switch (scenarioCreateState.flow) {
            case CreateScenarioFlow.Upload:
                return <ScenarioCreateUpload/>;
            case CreateScenarioFlow.Filter:
                return <ScenarioCreateFilter/>;
            case CreateScenarioFlow.Finalise:
                return <ScenarioCreateFinalise/>
            default:
                return <></>
        }
    }

    return (
        <>

            <GeneralAppBar/>

            <Container maxWidth={"xl"} sx={{mb: 3}}>

                <BreadCrumbs breadCrumbs={breadCrumbs(organisationId, projectId)}/>

                {component()}

            </Container>


        </>
    )

}

function breadCrumbs(organisationId: string | undefined, projectId: string | undefined): IBreadCrumb[] {
    return [
        {
            label: "Organisations",
            link: `/organisations`
        },
        {
            label: "Organisation",
            link: `/organisations/${organisationId}`
        },
        {
            label: "Project",
            link: `/organisations/${organisationId}/projects/${projectId}`
        },
        {
            label: "Create Scenario",
            link: `#`
        }
    ] as IBreadCrumb[];
}