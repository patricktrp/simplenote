import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { BsLayoutSidebar } from 'react-icons/bs'
import { IoCreateOutline, IoMenuOutline } from 'react-icons/io5'
import { Link, Outlet, Form, useLoaderData, redirect, useNavigate, useParams } from 'react-router-dom'
import { createNote, getNotes } from '../api/notes'
import styles from './root.module.css'

export const loader = async () => {
    const notes = await getNotes()
    return notes
}

export const action = async () => {
    const note = await createNote();
    return redirect("/notes/" + note.noteId);
}

const Root = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0()
    const [showSidebar, setShowSidebar] = useState(true)
    const notes = useLoaderData()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (notes.length > 0) {
            navigate("/notes/" + notes[0].noteId)
        }
    }, [])

    const toggleSidebar = () => {
        setShowSidebar((sideBarWasVisible) => !sideBarWasVisible)
    }

    return (
        <div className={styles['root-layout']}>
            <div className={`${styles['sidebar']} ${!showSidebar && styles['hidden']}`}>
                <div className={styles['sidebar-header']}>
                    <IoMenuOutline className={styles['icon']} size="35" />
                    <div>All Notes</div>
                    <Form method="post">
                        <button type="submit">
                            <IoCreateOutline className={styles['icon']} size="27" />
                        </button>
                    </Form>
                </div>
                <div className={styles['search-bar']}>
                    <input type='text'></input>
                </div>
                {notes?.map(note =>
                    <Link to={`/notes/${note.noteId}`} className={`${styles['note-overview']} ${note.noteId === params.noteId ? styles['selected'] : ''}`} key={note.createdAt}>{note.content || "New Note..."}</Link>
                )}
            </div>
            <div className={styles['main-area']}>
                <div className={styles['control-bar']}>
                    <BsLayoutSidebar onClick={toggleSidebar} className={styles['icon']} size="24" />
                    <div>{isAuthenticated ? <p>{user?.nickname}</p> : <button onClick={() => loginWithRedirect()}>Login</button>}</div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Root