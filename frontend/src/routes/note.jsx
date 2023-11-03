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

  return (
    <Editor note={note} onUpdate={noteUpdateMutation} isLoading={isLoading} />
  )

  // <ContentLoader
  //   speed={2}
  //   width={400}
  //   height={160}
  //   viewBox="0 0 400 160"
  //   backgroundColor="#f3f3f3"
  //   foregroundColor="#ecebeb"
  // // style={{ width: '100%', height: '100%', backgroundColor: 'red', display: 'flex', alignItems: 'center' }}
  // >
  //   <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
  //   <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
  //   <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
  //   <rect x="15" y="50" rx="3" ry="3" width="90" height="10" />
  //   <rect x="115" y="50" rx="3" ry="3" width="60" height="10" />
  //   <rect x="185" y="50" rx="3" ry="3" width="200" height="10" />
  //   <rect x="15" y="90" rx="3" ry="3" width="130" height="10" />
  //   <rect x="160" y="90" rx="3" ry="3" width="120" height="10" />
  //   <rect x="290" y="90" rx="3" ry="3" width="95" height="10" />
  //   <rect x="15" y="130" rx="3" ry="3" width="130" height="10" />
  //   <rect x="160" y="130" rx="3" ry="3" width="225" height="10" />
  // </ContentLoader>
}

export default Note