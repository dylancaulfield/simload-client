import {Alert, Box, Divider, Link, Paper, TextField, Typography, useTheme} from "@mui/material";
import {object, string} from "yup";
import "../Styles/FormStyles";
import {useFormik} from "formik";
import {form, formElement, formHeading, formHeadingContainer} from "../Styles/FormStyles";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import CreateSession from "../Services/CreateSessionService";
import GeneralAppBar from "../../../Common/GeneralAppBar";
import {LoadingButton} from "@mui/lab";

export default function BeginSignInView() {

    const {palette} = useTheme();
    const navigate = useNavigate();

    const [errorState, setErrorState] = useState({
        error: ""
    });

    const schema = object().shape({
        emailAddress: string()
            .email()
            .required(),
    });

    const {values, errors, touched, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            emailAddress: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {

            const [error, session] = await CreateSession({
                ...values,
                session: undefined
            });
            if (error) {
                setErrorState({
                    error
                });
                return;
            }

            const sessionEncoded = encodeURIComponent(session!.session);
            navigate(`/sign-in/${sessionEncoded}`);

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

            <GeneralAppBar/>

            <Box
                sx={formHeadingContainer}
            >

                <Typography
                    fontWeight={"bold"}
                    sx={formHeading}
                    variant={"h4"}
                    component={"h1"}>
                    Sign In
                </Typography>

            </Box>

            <Paper
                sx={form}
                elevation={3}>


                <form onSubmit={handleSubmit}>

                    {alert()}

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
                    />

                    <LoadingButton
                        loading={isSubmitting}
                        type={"submit"}
                        sx={formElement}
                        variant={"contained"}
                    >
                        <span>Next</span>
                    </LoadingButton>

                </form>


                <Divider
                    sx={formElement}
                />

                <Typography>
                    Don't have an account? <Link component={RouterLink} to={"/sign-up"}
                                                 sx={{color: palette.primary.light}}>Sign up here</Link>
                </Typography>

            </Paper>


        </>
    )

}