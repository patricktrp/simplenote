import { updateNoteById } from "../api/notes";

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { $getRoot } from "lexical";
import { debounce } from 'lodash';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './Editor.module.css';

function BackendSyncPlugin({ noteId, onUpdate }) {
  const [editor] = useLexicalComposerContext()

  const syncBackend = async (editorContent) => {
    const stringifiedEditorState = JSON.stringify(
      editor.getEditorState().toJSON(),
    );
    const parsedEditorState = editor.parseEditorState(stringifiedEditorState);

    const rawContent = parsedEditorState.read(() => $getRoot().getTextContent())
    onUpdate.mutate({ noteId, editorContent, rawContent: rawContent })
  }

  const debouncedHandleChange = debounce(syncBackend, 500)

  return (<OnChangePlugin onChange={debouncedHandleChange} ignoreSelectionChange />)
}

function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext()
  const params = useParams()

  useEffect(() => {
    editor.focus()
  }, [editor, params])

  return null
}

const Editor = ({ note, onUpdate }) => {
  const theme = {}

  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "notes" + note?.noteId,
    theme,
    onError
  };

  if (note?.content) {
    initialConfig['editorState'] = note?.content
  }

  return (
    <div className={styles['editor']}>
      <LexicalComposer key={note?.noteId} initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={styles['content-editable']} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <BackendSyncPlugin noteId={note?.noteId} onUpdate={onUpdate} />
      </LexicalComposer>
    </div>
  )
}

export default Editor