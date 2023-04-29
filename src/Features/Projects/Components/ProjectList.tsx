import React, {ChangeEvent, useEffect, useState} from "react";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateProjectForm from "./CreateProjectForm";
import {filterText} from "../../../Utilities/Filter";


interface IProject {
    id: string,
    name: string
}

interface IProjectListViewState {
    projects: IProject[] | null
}

export default function ProjectList() {

    const [projectsState, setProjectsState] = useState<IProjectListViewState>({
        projects: null
    });
    const [projectFilterState, setProjectFilterState] = useState("");
    const [createProjectState, setCreateProjectState] = useState(false);

    const {organisationId} = useParams();

    useEffect(() => {

        const fetchProjects = async () => {

            const response = await axiosAuthenticatedClient.get<IProject[]>(`/api/organisations/${organisationId}/projects`);
            setProjectsState({
                projects: response.data
            });

        }
        fetchProjects();

    }, []);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectFilterState(e.target.value)
    }

    const toggleDialog = () => {
        setCreateProjectState(prev => !prev);
    }

    const projectsList = () => {

        if (!projectsState.projects) {
            return <CircularProgress color={"primary"}></CircularProgress>
        }

        if (!projectsState.projects.length) {
            return <Typography sx={{mt: 3}} variant={"body1"}>You are not a member of any projects.</Typography>
        }

        const projects = projectsState.projects!
            .filter(p => filterText(p, projectFilterState))
            .map(p => {
                return (
                    <TableRow key={p.id}>
                        <TableCell align={"left"}>
                            <Link component={RouterLink} to={`/organisations/${organisationId}/projects/${p.id}`}>
                                {p.name}
                            </Link>
                        </TableCell>
                    </TableRow>
                )
            });
        return (
            <Table>
                <TableBody>
                    {projects}
                </TableBody>
            </Table>
        )

    }

    return (
        <>

            <Box sx={{mb: 3}}>
                <Button sx={{float: "right"}} onClick={toggleDialog} variant={"contained"}
                        endIcon={<AddIcon/>}>
                    Create
                </Button>

                <TextField size={"small"} label="Search Projects" variant="outlined" name="name"
                           value={projectFilterState}
                           onChange={handleFilterChange}/>
            </Box>

            <Divider/>

            {projectsList()}

            <Dialog onClose={toggleDialog} open={createProjectState}>

                <DialogTitle>Create Project</DialogTitle>

                <DialogContent>

                    <CreateProjectForm/>

                </DialogContent>

            </Dialog>

        </>
    )

}
