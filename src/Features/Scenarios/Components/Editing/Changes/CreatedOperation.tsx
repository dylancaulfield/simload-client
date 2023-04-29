import {useRecoilState} from "recoil";
import {ScenarioEditingCreatedOperationsState} from "../../../State/ScenarioEditingState";
import {IOperationProps} from "./ScenarioOperationEditorChanges";


export default function CreatedOperation(props: IOperationProps) {

    const [, setCreatedOperations] = useRecoilState(ScenarioEditingCreatedOperationsState);

    const removeOperation = () => {
        setCreatedOperations(p => {
            return p.filter(o => o.operationId !== o.operationId)
        });
    }

    return (
        <>

            {props.operation.operationId}

        </>
    );

}