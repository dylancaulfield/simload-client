import React from "react";
import Editor from "@monaco-editor/react";
import {editor} from "monaco-editor";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScenarioEditingInitialState,
    ScenarioEditingUpdatedCodeState,
    ScenarioEditingWithChangesSelector
} from "../../../State/ScenarioEditingState";
import {ThemeState} from "../../../../../State/ThemeState";
import {useNavigate, useParams} from "react-router-dom";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import IModelContentChangedEvent = editor.IModelContentChangedEvent;

export default function ScenarioCodeEditor() {

    const editorStateSelector = useRecoilValue(ScenarioEditingWithChangesSelector);
    const useDarkTheme = useRecoilValue(ThemeState);

    const {organisationId, projectId, scenarioId} = useParams();
    const navigate = useNavigate();

    const initialCodeState = useRecoilValue(ScenarioEditingInitialState);
    const [, setUpdatedCodeState] = useRecoilState(ScenarioEditingUpdatedCodeState);

    const handleEditorMounted = function (editor: IStandaloneCodeEditor) {

        editor.onDidChangeCursorPosition(() => {

            const lineNumber = editor.getPosition()!.lineNumber;
            const line = editor.getValue().split("\n")[lineNumber - 1];
            const pattern = RegExp("[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}");
            const results = pattern.exec(line);

            if (!results || !results.length) return navigate(`/organisations/${organisationId}/projects/${projectId}/scenarios/${scenarioId}`);

            const guid = results[0];
            navigate(`/organisations/${organisationId}/projects/${projectId}/scenarios/${scenarioId}/operations/${guid}`);

        });

    }

    const handleEditorChange = (value: string | undefined, event: IModelContentChangedEvent) => {

        if (value === initialCodeState.code) return setUpdatedCodeState(null);
        setUpdatedCodeState(value ?? null);

    }


    const theme = useDarkTheme ? "vs-dark" : "vs"

    return (
        <>
            <Editor onChange={handleEditorChange} value={editorStateSelector.code} onMount={handleEditorMounted}
                    theme={theme} width={"100%"}
                    height={"93.15vh"}
                    defaultLanguage={"csharp"}/>
        </>
    )

}

