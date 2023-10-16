import axios from 'axios'

export const getNote = async (noteId) => {
    return {
        noteId: "1",
        inhalt: "hello world"
    }
}

export const getNotes = async (token) => {
    console.log(token)
    if (token === undefined) return null
    const res = await axios.get("http://localhost:8080/notes", {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        // withCredentials: true
    })
    return res.data
}

export const createNote = async () => {
    return { noteId: "2", inhalt: "hello mars" }
}
