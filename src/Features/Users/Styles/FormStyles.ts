import {SxProps, Theme} from "@mui/material";

export const form: SxProps<Theme> = {
    margin: "auto auto",
    maxWidth: "400px",
    padding: "20px"
} as const;

export const formElement: SxProps<Theme> = {
    marginBottom: "20px"
} as const;

export const formHeading: SxProps<Theme> = {
    textAlign: "center",
    borderBottom: "solid 5px",
    borderColor: "primary.dark",
    display: "inline-block",
    margin: "0px auto",
    paddingBottom: "10px"
} as const;

export const formHeadingContainer: SxProps<Theme> = {
    margin: "150px 0px 20px 0px",
    textAlign: "center",
} as const;
