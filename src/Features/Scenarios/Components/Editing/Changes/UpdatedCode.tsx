import {useRecoilState} from "recoil";
import {ScenarioEditingUpdatedCodeState} from "../../../State/ScenarioEditingState";
import {Button} from "@mui/material";
import {Undo} from "@mui/icons-material";

export default function UpdatedCode() {

    const [codeChanges, setCodeChanges] = useRecoilState(ScenarioEditingUpdatedCodeState);

    const removeCodeChange = () => {
        setCodeChanges(null);
    }

    return (
        <>

            {codeChanges ? "Code changed" : "Code not changed"}

            {codeChanges &&
                <Button size={"small"} sx={{ml: 3}} variant={"contained"} color={"primary"} onClick={removeCodeChange} endIcon={<Undo/>}>Undo</Button>}

        </>
    )

}