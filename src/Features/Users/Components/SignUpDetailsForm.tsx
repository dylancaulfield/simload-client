import {Alert, Box, Divider, Link, Paper, TextField, Typography} from "@mui/material";
import {object, string} from "yup";
import {useFormik} from "formik";
import {form, formElement, formHeading, formHeadingContainer} from "../Styles/FormStyles";
import {Link as RouterLink} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import createUser from "../Services/CreateUserService";
import {useState} from "react";

const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

export interface SignUpDetailsFormProps {
    onProgress: Function
}

export default function SignUpDetailsForm(props: SignUpDetailsFormProps) {

    const [errorState, setErrorState] = useState({
        error: ""
    });

    const schema = object().shape({
        displayName: string()
            .required("Name is required"),
        emailAddress: string()
            .email("Email address must be valid")
            .required("Email address is required"),
    });

    const {values, errors, touched, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            displayName: "",
            emailAddress: "",
        },
        validationSchema: schema,
        onSubmit: async values => {

            const error = await createUser(values);
            if (error) {
                setErrorState({
                    error
                });
                return;
            }

            props.onProgress(values.emailAddress);

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


            <Box
                sx={formHeadingContainer}
            >

                <Typography
                    fontWeight={"bold"}
                    sx={formHeading}
                    variant={"h4"}
                    component={"h1"}>
                    Sign Up
                </Typography>

            </Box>

            <Paper
                sx={form}
                elevation={3}>


                <form onSubmit={handleSubmit} noValidate>

                    {alert()}

                    <TextField
                        value={values.displayName}
                        error={touched.displayName && !!errors.displayName}
                        helperText={touched.displayName && errors.displayName}
                        onChange={handleChange}
                        name={"displayName"}
                        type={"text"}
                        className={"form-element"}
                        fullWidth={true}
                        variant={"filled"}
                        label={"Display Name"}
                        sx={formElement}
                        disabled={isSubmitting}
                    />

                    <TextField
                        value={values.emailAddress}
                        error={touched.emailAddress && !!errors.emailAddress}
                        helperText={touched.emailAddress && errors.emailAddress}
                        onChange={handleChange}
                        name={"emailAddress"}
                        type={"email"}
                        className={"form-element"}
                        fullWidth={true}
                        variant={"filled"}
                        label={"Email Address"}
                        sx={formElement}
                        disabled={isSubmitting}
                    />

                    <LoadingButton
                        loading={isSubmitting}
                        type={"submit"}
                        sx={formElement}
                        variant={"contained"}
                    >
                        <span>Sign Up</span>
                    </LoadingButton>

                </form>


                <Divider
                    sx={formElement}
                />

                <Typography>
                    <Link component={RouterLink} to={"/sign-in"} sx={{color: "primary.light"}}>Already have an
                        account?</Link>
                </Typography>

            </Paper>


        </>
    )

}
