import {useRecoilValue} from "recoil";
import {ScenarioCreationStateFilteredOperations} from "../../State/ScenarioCreationState";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

export default function ScenarioCreateFilteredOperationsAccordion() {

    const filteredOperations = useRecoilValue(ScenarioCreationStateFilteredOperations)

    return (
        <>

            <Accordion>

                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Typography variant={"h5"} fontWeight={"bold"} component={"h2"}>
                        Selected Operations ({filteredOperations.length})
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>

                    <List>

                        {filteredOperations.map(o => <>
                            <ListItem key={o.operationId}>
                                <ListItemText>
                                    {`${o.request.host}${o.request.path}`}
                                </ListItemText>
                            </ListItem>
                        </>)}

                    </List>

                </AccordionDetails>

            </Accordion>

        </>
    )

}