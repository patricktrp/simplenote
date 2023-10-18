import { getNote, updateNoteById } from "../api/notes";

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { useEffect, useState } from "react";
import styles from './note.module.css';
import { useParams } from "react-router-dom";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { debounce } from 'lodash'
import { $getRoot } from "lexical";

export const loader = async ({ params }) => {
  const note = await getNote(params.noteId)
  return note
}

function BackendSyncPlugin({ noteId }) {
  const [editor] = useLexicalComposerContext()

  const syncBackend = async (editorContent) => {
    const stringifiedEditorState = JSON.stringify(
      editor.getEditorState().toJSON(),
    );
    const parsedEditorState = editor.parseEditorState(stringifiedEditorState);

    const editorStateTextString = parsedEditorState.read(() => $getRoot().getTextContent())
    await updateNoteById(noteId, editorContent, editorStateTextString);
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

const Note = () => {
  const params = useParams()

  const theme = {}

  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <div className={styles['editor']}>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={styles['content-editable']} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <BackendSyncPlugin noteId={params.noteId} />
      </LexicalComposer>
    </div>
  )
}

export default Note