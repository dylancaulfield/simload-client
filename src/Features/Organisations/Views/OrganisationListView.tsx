import GeneralAppBar from "../../../Common/GeneralAppBar";
import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import AddIcon from "@mui/icons-material/Add";
import CreateOrganisationForm from "../Components/CreateOrganisationForm";
import {Link as RouterLink} from "react-router-dom";
import {filterText} from "../../../Utilities/Filter";

interface IOrganisation {
    id: string,
    name: string,
    description: string
}

interface IOrganisationListState {
    organisations: IOrganisation[] | null
}

export default function OrganisationListView() {

    const [organisationsState, setOrganisationsState] = useState<IOrganisationListState>({
        organisations: null,
    });
    const [organisationFilterState, setOrganisationFilterState] = useState("");

    const [createOrganisationState, setCreateOrganisationState] = useState(false);

    useEffect(() => {

        const fetchOrganisations = async () => {

            const response = await axiosAuthenticatedClient.get<IOrganisation[]>("/api/organisations");
            setOrganisationsState({
                organisations: response.data
            });

        }
        fetchOrganisations();

    }, []);

    const toggleDialog = () => {
        setCreateOrganisationState(prev => !prev);
    }

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOrganisationFilterState(e.target.value);
    }

    const organisationsList = () => {

        if (!organisationsState.organisations) {
            return <CircularProgress color={"primary"}></CircularProgress>
        }

        if (!organisationsState.organisations.length) {
            return <Typography variant={"body1"}>You are not a member of any organisations.</Typography>
        }

        const organisations = organisationsState.organisations!
            .filter(o => filterText(o, organisationFilterState))
            .map(o => {
                return (
                    <TableRow key={o.id}>
                        <TableCell align={"left"}>
                            <Link component={RouterLink} to={`/organisations/${o.id}`}>
                                {o.name}
                            </Link>
                        </TableCell>
                    </TableRow>
                )
            });
        return (
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableBody>
                        {organisations}
                    </TableBody>
                </Table>
            </TableContainer>
        )

    }

    return (
        <>

            <GeneralAppBar/>


            <Container maxWidth={"xl"} sx={{mb: 3}}>

                <BreadCrumbs breadCrumbs={breadCrumbs()}/>

                <Box sx={{mb: 3}}>
                    <Button sx={{float: "right"}} onClick={toggleDialog} variant={"contained"}
                            endIcon={<AddIcon/>}>
                        Create
                    </Button>

                    <TextField size={"small"} label="Search Organisations" variant="outlined" name="name"
                               value={organisationFilterState}
                               onChange={handleFilterChange}/>
                </Box>

                {organisationsList()}

                <Dialog onClose={toggleDialog} open={createOrganisationState}>

                    <DialogTitle>Create Organisation</DialogTitle>

                    <DialogContent>

                        <CreateOrganisationForm/>

                    </DialogContent>

                </Dialog>

            </Container>

        </>
    )


}

function breadCrumbs(): IBreadCrumb[] {

    return [
        {
            label: "Organisations",
            link: "/organisations"
        }
    ]

}