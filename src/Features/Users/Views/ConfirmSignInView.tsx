import {Alert, Box, Divider, Link, Paper, TextField, Typography, useTheme} from "@mui/material";
import {object, string} from "yup";
import "../Styles/FormStyles";
import {useFormik} from "formik";
import {form, formElement, formHeading, formHeadingContainer} from "../Styles/FormStyles";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import RetrieveTokens from "../Services/RetrieveTokensService";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {UserState} from "../../../State/UserState";
import RetrieveUser from "../Services/RetrieveUserService";
import GeneralAppBar from "../../../Common/GeneralAppBar";
import {LoadingButton} from "@mui/lab";

export default function ConfirmSignInView() {

    const {palette} = useTheme();
    const {session} = useParams();
    const navigate = useNavigate();

    const schema = object().shape({
        code: string()
            .required(),
    });

    const [userState, setUserState] = useRecoilState(UserState);

    const [errorState, setErrorState] = useState({
        error: ""
    });

    const alert = () => {
        if (errorState.error) {
            return <Alert sx={formElement} severity={"error"} variant={"filled"}>{errorState.error}</Alert>
        } else {
            return ""
        }
    }

    const {values, errors, touched, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {

            if (!session) {
                return;
            }

            const [error, tokens] = await RetrieveTokens({
                session,
                code: values.code
            });
            if (error) {
                setErrorState({
                    error
                });
                return;
            }

            localStorage.setItem("accessToken", tokens!.accessToken);
            localStorage.setItem("refreshToken", tokens!.refreshToken);

            const user = await RetrieveUser();
            await setUserState(user);

            navigate("/organisations");

        }
    });

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
                    Confirm Sign In
                </Typography>

            </Box>

            <Paper
                sx={form}
                elevation={3}>

                <form onSubmit={handleSubmit}>

                    {alert()}

                    <TextField
                        value={values.code}
                        error={touched.code && !!errors.code}
                        helperText={touched.code && errors.code}
                        onChange={handleChange}
                        name={"code"}
                        type={"text"}
                        className={"form-element"}
                        fullWidth={true}
                        variant={"filled"}
                        label={"Confirmation Code"}
                        sx={formElement}
                    />

                    <LoadingButton
                        loading={isSubmitting}
                        type={"submit"}
                        sx={formElement}
                        variant={"contained"}
                    >
                        <span>Sign In</span>
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

enum SignInFlow {
    EmailAddress,
    Confirmation
}