import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import CreateLoadGeneratorForm from "./CreateLoadGeneratorForm";
import React from "react";

export interface ICreateLoadGeneratorDialogProps {
    open: boolean,

    onCreate(name: string): void

    onClose(): void
}

export default function CreateLoadGeneratorDialog(props: ICreateLoadGeneratorDialogProps) {

    const handleOnCreated = (name: string) => {
        props.onClose();
        props.onCreate(name);
    }

    return (

        <Dialog onClose={props.onClose} open={props.open}>

            <DialogTitle>Create Load Generator Credential</DialogTitle>

            <DialogContent>

                <CreateLoadGeneratorForm onCreated={handleOnCreated}/>

            </DialogContent>

        </Dialog>

    )

}