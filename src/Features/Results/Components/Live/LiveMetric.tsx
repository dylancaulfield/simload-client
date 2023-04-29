import {Grid, Paper, Typography} from "@mui/material";

export interface ILiveMetricProps {
    name: string,
    value: string,
    unit?: string
}

export default function LiveMetric(props: ILiveMetricProps) {

    return (
        <>

            <Grid item sm={4}>

                <Paper elevation={3} sx={{p: 3}}>

                    <Typography sx={{mb: 2}} variant={"h6"}>
                        {props.name}
                    </Typography>

                    <Typography color={"secondary"} variant={"h3"} sx={{display: "inline-block"}}>
                        {props.value}
                    </Typography>

                    <Typography color={"secondary"} variant={"h6"} sx={{display: "inline-block"}}>
                        <span>&nbsp;</span>{props.unit}
                    </Typography>

                </Paper>


            </Grid>

        </>
    )

}