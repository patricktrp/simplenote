import { getNoteById, updateNoteById } from "../api/notes";

import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";

const Note = () => {
  const params = useParams()
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  const { data: note, isLoading } = useQuery({
    queryKey: ["notes", params.noteId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getNoteById(token, params.noteId)
    }
  })

  const noteUpdateMutation = useMutation({
    mutationFn: async ({ noteId, editorContent, rawContent }) => {
      const token = await getAccessTokenSilently()
      return updateNoteById(token, noteId, editorContent, rawContent)
    },
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