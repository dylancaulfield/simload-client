import {useNavigate, useParams} from "react-router-dom";
import {object, string} from "yup";
import {useFormik} from "formik";
import {Alert, TextField} from "@mui/material";
import {form, formElement} from "../../Users/Styles/FormStyles";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";

export default function CreateProjectForm() {

    const navigate = useNavigate();
    const {organisationId} = useParams();

    const [errorState, setErrorState] = useState({
        error: ""
    });

    const schema = object().shape({
        name: string()
            .required("Name is required"),
        description: string()
    });

    const {values, errors, touched, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: schema,
        onSubmit: async values => {

            try {
                const response = await axiosAuthenticatedClient.post(`/api/organisations/${organisationId}/projects`, values);
                navigate(`/organisations/${organisationId}/projects/${response.data}`);
            } catch (e) {
                setErrorState({
                    error: (e as Error).message
                });
            }

        }
    });

    const alert = () => {
        if (errorState.error) {
            return <Alert sx={formElement} severity={"error"} variant={"filled"}>{errorState.error}</Alert>
        } else {
            return ""
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>

                {alert()}

                <TextField
                    value={values.name}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    onChange={handleChange}
                    name={"name"}
                    type={"text"}
                    className={"form-element"}
                    fullWidth={true}
                    variant={"filled"}
                    label={"Project Name"}
                    sx={formElement}
                    disabled={isSubmitting}
                />

                <TextField
                    multiline
                    minRows={3}
                    value={values.description}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    onChange={handleChange}
                    name={"description"}
                    type={"text"}
                    className={"form-element"}
                    fullWidth={true}
                    variant={"filled"}
                    label={"Description"}
                    sx={formElement}
                    disabled={isSubmitting}
                />

                <LoadingButton
                    loading={isSubmitting}
                    type={"submit"}
                    variant={"contained"}
                >
                    <span>Create</span>
                </LoadingButton>

            </form>
        </>
    )

}