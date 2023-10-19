import { getNoteById } from "../api/notes";

import { useLoaderData } from "react-router-dom";
import Editor from "../components/Editor";

export const loader = async ({ params }) => {
  const note = await getNoteById(params.noteId)
  return note
}

const Note = () => {
  const note = useLoaderData()

  return (
      <Editor note={note}/>
  )
}

export default Note