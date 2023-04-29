import {IOperationProps} from "./ScenarioOperationEditorChanges";
import {ScenarioEditingDeletedOperationsState} from "../../../State/ScenarioEditingState";
import {useRecoilState} from "recoil";

export default function DeletedOperation(props: IOperationProps) {

    const [, setDeletedOperations] = useRecoilState(ScenarioEditingDeletedOperationsState);

    const removeOperation = () => {
        setDeletedOperations(p => {
            return p.filter(o => o.operationId !== o.operationId)
        });
    }

    return (
        <>

            {props.operation.operationId}

        </>
    )

}