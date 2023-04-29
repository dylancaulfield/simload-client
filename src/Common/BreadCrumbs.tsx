import {Breadcrumbs, Button, Paper} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {Link as RouterLink} from "react-router-dom";

export interface IBreadCrumb {
    label: string,
    link: string
}

export interface IBreadCrumbProps {
    breadCrumbs: IBreadCrumb[]
}

export default function BreadCrumbs(props: IBreadCrumbProps) {

    return (
        <>

            <Paper elevation={3} sx={{mb: 3, px: 2, py: 1, width: "100%"}}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}>
                    {props.breadCrumbs.map(b =>
                        <Button size={"small"} key={b.link + b.label} component={RouterLink}
                                to={b.link}>{b.label}</Button>
                    )}
                </Breadcrumbs>
            </Paper>

        </>
    )

}