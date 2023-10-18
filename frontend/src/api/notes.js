import axios from 'axios'

export const getNote = async (noteId) => {
    return {
        noteId: "1",
        inhalt: "hello world"
    }
}

export const getNotes = async () => {
    const res = await axios.get("http://localhost:8080/notes", {
        withCredentials: true,
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc1NjgyMjcsImV4cCI6MTY5NzY1NDYyNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.WzX769p3-YChWM7XXguMH-czjUTShyOz1zOFybrpsB_25KvprE14-xLC5bdeJrm-wSStLj7xpIBFrnrtJh2cDjGH_lLqMUlUvGEhOaGKyvcK7aOVHGfUJbolGmK_Xo9K0O3NFLJZRd9D5pE29Wu3ovuzX1q5_aeh3JMstdyNrZBnZJuo0z7IaD5ik_ETzxdTBpx2w0S-7Xd2hu5ovX6sOyFB586dT6ZDX6dsB-fYrbPjctQ3U1j3Wh5nwx6HmxMehAZU8Hd5d9GbFHsb_SQ-IzaaCHBR56KwKRTg4gDryEef_TL5aHoQG7PffIs-UDppHEYuO6pKyKBEMyZMi8BLqA"
        }
    })
    console.log(res.data)
    return res.data
}

export const createNote = async () => {
    const res = await axios.post("http://localhost:8080/notes", {}, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc1NjgyMjcsImV4cCI6MTY5NzY1NDYyNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.WzX769p3-YChWM7XXguMH-czjUTShyOz1zOFybrpsB_25KvprE14-xLC5bdeJrm-wSStLj7xpIBFrnrtJh2cDjGH_lLqMUlUvGEhOaGKyvcK7aOVHGfUJbolGmK_Xo9K0O3NFLJZRd9D5pE29Wu3ovuzX1q5_aeh3JMstdyNrZBnZJuo0z7IaD5ik_ETzxdTBpx2w0S-7Xd2hu5ovX6sOyFB586dT6ZDX6dsB-fYrbPjctQ3U1j3Wh5nwx6HmxMehAZU8Hd5d9GbFHsb_SQ-IzaaCHBR56KwKRTg4gDryEef_TL5aHoQG7PffIs-UDppHEYuO6pKyKBEMyZMi8BLqA"
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
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFFS19fVlBTZHZJb0pjWVRlUXQ2ciJ9.eyJpc3MiOiJodHRwczovL3NpbXBsZW5vdGUuZXUuYXV0aDAuY29tLyIsInN1YiI6Ino0R2drYXBPNWhsRmtiSG4wdjIxV3Q1Vzd0bEk0TDU0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5zaW1wbGVub3RlLnRyZXBwbWFubi5kZXYiLCJpYXQiOjE2OTc1NjgyMjcsImV4cCI6MTY5NzY1NDYyNywiYXpwIjoiejRHZ2thcE81aGxGa2JIbjB2MjFXdDVXN3RsSTRMNTQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.WzX769p3-YChWM7XXguMH-czjUTShyOz1zOFybrpsB_25KvprE14-xLC5bdeJrm-wSStLj7xpIBFrnrtJh2cDjGH_lLqMUlUvGEhOaGKyvcK7aOVHGfUJbolGmK_Xo9K0O3NFLJZRd9D5pE29Wu3ovuzX1q5_aeh3JMstdyNrZBnZJuo0z7IaD5ik_ETzxdTBpx2w0S-7Xd2hu5ovX6sOyFB586dT6ZDX6dsB-fYrbPjctQ3U1j3Wh5nwx6HmxMehAZU8Hd5d9GbFHsb_SQ-IzaaCHBR56KwKRTg4gDryEef_TL5aHoQG7PffIs-UDppHEYuO6pKyKBEMyZMi8BLqA"
        },
        withCredentials: true
    })
    return res.data
}
