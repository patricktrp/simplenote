import { useLoaderData } from "react-router-dom"
import { getNote } from "../api/notes"

export const loader = async ({ params }) => {
    const note = await getNote(params.noteId)
    return note
}

const Note = () => {
    const note = useLoaderData()

    return (
        <div>
            {JSON.stringify(note)}
        </div>
    )
}

export default Note