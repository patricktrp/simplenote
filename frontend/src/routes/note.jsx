import { getNoteById, updateNoteById } from "../api/notes";

import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Note = () => {
  const params = useParams()
  const queryClient = useQueryClient()

  const { data: note, isLoading } = useQuery({
    queryKey: ["notes", params.noteId],
    queryFn: () => getNoteById(params.noteId)
  })

  const noteUpdateMutation = useMutation({
    mutationFn: ({ noteId, editorContent, rawContent }) => updateNoteById(noteId, editorContent, rawContent),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"])
      queryClient.invalidateQueries(["notes", "params.noteId"])
    }
  })

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  return (
    <Editor note={note} onUpdate={noteUpdateMutation} />
  )
}

export default Note