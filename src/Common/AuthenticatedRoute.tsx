import {Navigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {UserPresent} from "../State/UserState";
import {PropsWithChildren} from "react";

export default function AuthenticatedRoute(props: PropsWithChildren) {

    const userPresent = useRecoilValue(UserPresent);
    const navigate = () => {

        if (!userPresent) {
            return <Navigate to={"/sign-in"}/>
        }

        return (
            <></>
        )

    }

    return (
        <>

            {navigate()}
            {props.children}

        </>
    )

}