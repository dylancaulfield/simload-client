import {useNavigate, useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    CreateScenarioFlow,
    ScenarioCreationState,
    ScenarioCreationStateFilteredOperations
} from "../../State/ScenarioCreationState";
import {ChangeEvent, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ScenarioGenerator} from "../../Services/ScenarioGenerator";
import axiosAuthenticatedClient from "../../../../Utilities/AxiosAuthenticatedClient";
import {IRequest, IResponse} from "../../Services/OperationsGenerator";

interface ICreateScenarioSubmission {
    name: string,
    description: string,
    code: string,
    operations: object
}

interface IOperation {
    originalRequest: IRequest,
    originalResponse?: IResponse,
    request: IRequest
}

export default function ScenarioCreateFinalise() {

    const [scenarioMetaState, setScenarioMetaState] = useState({
        name: "",
        description: ""
    });
    const [scenarioCreationState, setScenarioCreationState] = useRecoilState(ScenarioCreationState);
    const filteredOperations = useRecoilValue(ScenarioCreationStateFilteredOperations);
    const {organisationId, projectId} = useParams();

    const navigate = useNavigate();

    const upload = async () => {

        const scenarioGenerator = new ScenarioGenerator(filteredOperations);
        const scenario = scenarioGenerator.generate();

        const operations: any = {}
        for (const operation of scenario.operations) {
            operations[operation.operationId] = operation;
        }

        const data: ICreateScenarioSubmission = {
            name: scenarioMetaState.name,
            description: scenarioMetaState.description,
            code: scenario.code,
            operations
        };

        console.log(data);

        try {
            const scenarioId = (await axiosAuthenticatedClient.post(`/api/projects/${projectId}/scenarios`, data)).data;
            setScenarioCreationState({
                flow: CreateScenarioFlow.Upload,
                operations: [],
                selectedHosts: []
            });
            navigate(`/organisations/${organisationId}/projects/${projectId}/scenarios/${scenarioId}`);

        } catch (e) {
            console.log(e);
        }

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        setScenarioMetaState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });

    }

    return (
        <>

            <Grid container spacing={3} sx={{mb: 3}}>

                <Grid item sm={6}>

                    <TextField fullWidth={true} onChange={handleChange} label={"Name"} name={"name"} variant={"filled"}
                               value={scenarioMetaState.name}/>


                </Grid>

                <Grid item sm={6}>

                    <TextField fullWidth={true} onChange={handleChange} label={"Description"} name={"name"}
                               variant={"filled"}
                               value={scenarioMetaState.description}/>

                </Grid>

            </Grid>

            <Button variant={"contained"} onClick={upload} endIcon={<AddIcon/>}>Create</Button>

        </>
    )

}