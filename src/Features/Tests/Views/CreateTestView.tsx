import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import GeneralAppBar from "../../../Common/GeneralAppBar";
import {
    Button,
    Checkbox,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Start} from "@mui/icons-material";
import getTestOptions, {IGetTestOptionsRequest, ITestOptions} from "../GetTestOptionsService";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";

export default function CreateTestView() {

    const {organisationId, projectId} = useParams();

    const [testOptions, setTestOptions] = React.useState<ITestOptions>();

    const [chosenOptions, setChosenOptions] = React.useState({
        hours: 0,
        minutes: 5,
        seconds: 0,
        scenarios: [] as number[],
        loadGenerators: [] as number[],
        virtualUsers: 10
    });

    const navigate = useNavigate();

    const handleNumericalValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChosenOptions({
            ...chosenOptions,
            [event.target.name]: event.target.value
        });
    }

    const handleScenarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = parseInt(event.target.value);

        if (chosenOptions.scenarios.includes(value)) {

            return setChosenOptions(p => {
                return {
                    ...p,
                    scenarios: p.scenarios.filter(v => v !== value)
                }
            });

        } else {

            return setChosenOptions(p => {
                return {
                    ...p,
                    scenarios: [...p.scenarios, value]
                }
            });
        }
    }

    const handleLoadGeneratorChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = parseInt(event.target.value);

        if (chosenOptions.loadGenerators.includes(value)) {

            return setChosenOptions(p => {
                return {
                    ...p,
                    loadGenerators: p.loadGenerators.filter(v => v !== value)
                }
            });

        } else {

            return setChosenOptions(p => {
                return {
                    ...p,
                    loadGenerators: [...p.loadGenerators, value]
                }
            });
        }
    }

    const startTest = async () => {

        let request = {
            name: new Date().toLocaleString(),
            duration: `${chosenOptions.hours}:${chosenOptions.minutes}:${chosenOptions.seconds}`,
            loadGeneratorIds: testOptions?.loadGenerators
                .filter((_, index) => chosenOptions.loadGenerators.includes(index))
                .map(lg => lg.id),
            scenarios: testOptions?.scenarios
                .filter((_, index) => chosenOptions.scenarios.includes(index))
                .map(s => {
                    return {
                        id: s.id,
                        weight: 1
                    }
                }),
            virtualUserGraph: {
                points: [
                    {
                        x: 0,
                        y: chosenOptions.virtualUsers
                    },
                    {
                        x: 100,
                        y: chosenOptions.virtualUsers
                    }
                ]
            }
        }

        try {
            const response = await axiosAuthenticatedClient.post(`/api/organisations/${organisationId}/projects/${projectId}/tests`, request);
            navigate(`/organisations/${organisationId}/projects/${projectId}/tests/${response.data}/live`);
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {

        const request: IGetTestOptionsRequest = {
            organisationId: organisationId!,
            projectId: projectId!
        }

        const fetchTestOptions = async () => {
            const result = await getTestOptions(request);
            if (typeof result === "string") {
                return console.log(result);
            }

            setTestOptions(result);

        }
        fetchTestOptions();

    }, []);

    return (
        <>

            <GeneralAppBar/>

            <Container maxWidth={"xl"} sx={{mb: 3}}>

                <BreadCrumbs breadCrumbs={breadCrumbs(organisationId, projectId)}/>

                <Paper elevation={3} sx={{p: 3, mb: 3}}>

                    <Typography variant={"h5"} sx={{mb: 3}}>Duration</Typography>

                    <TextField value={chosenOptions.hours} name={"hours"} size={"small"} type={"number"} label={"Hours"}
                               sx={{width: "100px"}} onChange={handleNumericalValueChange}/>

                    <TextField value={chosenOptions.minutes} name={"minutes"} size={"small"} type={"number"}
                               label={"Minutes"} sx={{ml: 3, width: "100px"}} onChange={handleNumericalValueChange}/>

                    <TextField value={chosenOptions.seconds} name={"seconds"} size={"small"} type={"number"}
                               label={"Seconds"} sx={{ml: 3, width: "100px"}} onChange={handleNumericalValueChange}/>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3}}>

                    <Typography variant={"h5"} sx={{mb: 3}}>Scenarios</Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Scenario</TableCell>
                                <TableCell>Weight</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testOptions?.scenarios.map((scenario, index) => (
                                <TableRow key={index}>
                                    <TableCell padding={"checkbox"}>
                                        <Checkbox onChange={handleScenarioChange} value={index}
                                                  checked={chosenOptions.scenarios.includes(index)}/>
                                    </TableCell>
                                    <TableCell>
                                        {scenario.name}
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={1} sx={{width: "100px"}} name={"weight"} size={"small"}
                                                   type={"number"}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3}}>

                    <Typography variant={"h5"} sx={{mb: 3}}>Load Generators</Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Last Updated</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testOptions?.loadGenerators.map((loadGenerator, index) => (
                                <TableRow key={index}>
                                    <TableCell padding={"checkbox"}>
                                        <Checkbox onChange={handleLoadGeneratorChange} value={index}
                                                  checked={chosenOptions.loadGenerators.includes(index)}
                                                  disabled={!loadGenerator.available}/>
                                    </TableCell>
                                    <TableCell>
                                        {loadGenerator.ipAddress}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(loadGenerator.lastUpdated).toLocaleTimeString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3}}>

                    <Typography variant={"h5"} sx={{mb: 3}}>Virtual Users</Typography>

                    <TextField value={chosenOptions.virtualUsers} name={"virtualUsers"}
                               onChange={handleNumericalValueChange} size={"small"} type={"number"} label={"Count"}
                               sx={{width: "100px"}}/>

                </Paper>

                <Button onClick={startTest} color={"secondary"} variant={"contained"} endIcon={<Start/>}>Start
                    Test</Button>

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
            label: "Start Test",
            link: `#`
        }
    ] as IBreadCrumb[];
}