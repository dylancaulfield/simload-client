import {useRouteError} from "react-router-dom";

export default function ErrorPage() {

    const error = (useRouteError() as any).error as Error;
    console.log(error);

    return (
        <>
            <p>{error.message}</p>
        </>
    )


}