import styles from './root.module.css'
import { Outlet, useLoaderData, Form } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getNotes, createNote } from '../api/notes'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export const loader = async () => {
    const notes = await getNotes()
    return notes
}

export const action = async () => {
    const note = await createNote();
    return note;
}

const Root = () => {
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchNotes = async (token) => {
            const notes = await getNotes(token)
            return notes
        }
        async function getToken() {
            const token = await getAccessTokenSilently()
            const notes = await fetchNotes(token)
            console.log(notes)
        }
        getToken()

    }, [getAccessTokenSilently])

    return (
        <div className={styles['root-layout']}>
            <div className={styles['sidebar']}>
                <Form method='post'>
                    <button type='submit'>New Note</button>
                </Form>
                <Link to='notes/1'>Note 1</Link>
                <Link to='notes/2'>Note 2</Link>
                <Link to='notes/3'>Note 3</Link>
                {!isAuthenticated && <button onClick={loginWithRedirect}>login</button>}
                {isAuthenticated && JSON.stringify(user)}
            </div>
            <div className={styles['outlet']}>
                <Outlet />
            </div>
        </div>
    )
}

export default Root