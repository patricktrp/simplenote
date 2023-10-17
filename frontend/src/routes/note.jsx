import { getNote } from "../api/notes";

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { useEffect, useState } from "react";
import styles from './note.module.css';
import { useParams } from "react-router-dom";

export const loader = async ({ params }) => {
  const note = await getNote(params.noteId)
  return note
}

function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
}

const Note = () => {
  // const note = useLoaderData()
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

  const [editorState, setEditorState] = useState();

  function onChange(editorState) {
    console.log(editorState);
  }

  return (
    <div className={styles['editor']}>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={styles['content-editable']} />}
          placeholder={<div>{params.noteId}</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  )
}

export default Note