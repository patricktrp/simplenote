import axios from 'axios'

export const getNotes = async (token) => {
    console.log(token)
    const res = await axios.get("http://localhost:8080/notes", {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const getNoteById = async (token, noteId) => {
    const res = await axios.get("http://localhost:8080/notes/" + noteId, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const createNote = async (token) => {
    const res = await axios.post("http://localhost:8080/notes", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
    return res.data
}

export const updateNoteById = async (token, noteId, editorContent, rawContent) => {
    editorContent = JSON.stringify(editorContent)
    const res = await axios.put(`http://localhost:8080/notes/${noteId}`, {
        editorContent,
        rawContent
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
    return res.data
}


export const getAiAssistantAnswer = async (token, query) => {
    const queryParam = encodeURIComponent(query)
    const res = await axios.get(`http://localhost:8080/assistant?query=${queryParam}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
    return res.data
}
