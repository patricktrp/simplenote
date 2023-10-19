import axios from 'axios'

export const getNotes = async () => {
    const res = await axios.get("http://localhost:8080/notes", {
        withCredentials: true,
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc3MTI4MTcsImV4cCI6MTY5Nzc5OTIxNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.T8yg98m_MMpBH1lSQR0Tyc_07zx8QEIG41ARFVRxXuc-haSGyF-eUyf3nOvyMsudii2JnFPkb5yhmSy9X_KxKpR6Ol4zC8vJbUiW2IvRgpf_leCrr6DOSQ5PSqtU8tbi1cUFP3U0MBAhc5NC7ISmzJR4pgBKE9siWjPNhaAxpoO3tY94UV3T0OrOOhYkOeQaMFj4fgDa1sPTf5WCO7okyjHR5fQb9j0HIkJ1VjB9-gLw7AyuAeFYk3mbGK_ptbTcGKny8aclQsY_GOclYsPkQAsyYLPHAzcUv8ip3lc4WViFo4chhxZD4Z403TqQK30fbQu1HCRr0WqGlwDT8e96KQ"
        }
    })
    console.log(res.data)
    return res.data
}

export const getNoteById = async (noteId) => {
    const res = await axios.get("http://localhost:8080/notes/" + noteId, {
        withCredentials: true,
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc3MTI4MTcsImV4cCI6MTY5Nzc5OTIxNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.T8yg98m_MMpBH1lSQR0Tyc_07zx8QEIG41ARFVRxXuc-haSGyF-eUyf3nOvyMsudii2JnFPkb5yhmSy9X_KxKpR6Ol4zC8vJbUiW2IvRgpf_leCrr6DOSQ5PSqtU8tbi1cUFP3U0MBAhc5NC7ISmzJR4pgBKE9siWjPNhaAxpoO3tY94UV3T0OrOOhYkOeQaMFj4fgDa1sPTf5WCO7okyjHR5fQb9j0HIkJ1VjB9-gLw7AyuAeFYk3mbGK_ptbTcGKny8aclQsY_GOclYsPkQAsyYLPHAzcUv8ip3lc4WViFo4chhxZD4Z403TqQK30fbQu1HCRr0WqGlwDT8e96KQ"
        }
    })
    console.log(res.data)
    return res.data
}

export const createNote = async () => {
    const res = await axios.post("http://localhost:8080/notes", {}, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc3MTI4MTcsImV4cCI6MTY5Nzc5OTIxNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.T8yg98m_MMpBH1lSQR0Tyc_07zx8QEIG41ARFVRxXuc-haSGyF-eUyf3nOvyMsudii2JnFPkb5yhmSy9X_KxKpR6Ol4zC8vJbUiW2IvRgpf_leCrr6DOSQ5PSqtU8tbi1cUFP3U0MBAhc5NC7ISmzJR4pgBKE9siWjPNhaAxpoO3tY94UV3T0OrOOhYkOeQaMFj4fgDa1sPTf5WCO7okyjHR5fQb9j0HIkJ1VjB9-gLw7AyuAeFYk3mbGK_ptbTcGKny8aclQsY_GOclYsPkQAsyYLPHAzcUv8ip3lc4WViFo4chhxZD4Z403TqQK30fbQu1HCRr0WqGlwDT8e96KQ"
        },
        withCredentials: true
    })
    console.log(res.data)
    return res.data
}

export const updateNoteById = async (noteId, editorContent, rawContent) => {
    console.log(rawContent)
    const res = await axios.put(`http://localhost:8080/notes/${noteId}`, {
        editorContent,
        rawContent
    }, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc3MTI4MTcsImV4cCI6MTY5Nzc5OTIxNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.T8yg98m_MMpBH1lSQR0Tyc_07zx8QEIG41ARFVRxXuc-haSGyF-eUyf3nOvyMsudii2JnFPkb5yhmSy9X_KxKpR6Ol4zC8vJbUiW2IvRgpf_leCrr6DOSQ5PSqtU8tbi1cUFP3U0MBAhc5NC7ISmzJR4pgBKE9siWjPNhaAxpoO3tY94UV3T0OrOOhYkOeQaMFj4fgDa1sPTf5WCO7okyjHR5fQb9j0HIkJ1VjB9-gLw7AyuAeFYk3mbGK_ptbTcGKny8aclQsY_GOclYsPkQAsyYLPHAzcUv8ip3lc4WViFo4chhxZD4Z403TqQK30fbQu1HCRr0WqGlwDT8e96KQ"
        },
        withCredentials: true
    })
    return res.data
}
