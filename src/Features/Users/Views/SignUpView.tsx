import "../Styles/FormStyles";
import SignUpDetailsForm from "../Components/SignUpDetailsForm";
import {useNavigate} from "react-router-dom";
import GeneralAppBar from "../../../Common/GeneralAppBar";


export default function SignUpView() {

    const navigate = useNavigate();

    const handleProgressToSignUp = (email: string) => {
        navigate(`/sign-in`);
    }

    return (

        <>

            <GeneralAppBar/>

            <SignUpDetailsForm onProgress={handleProgressToSignUp}/>

        </>

    )
}