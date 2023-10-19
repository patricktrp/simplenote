import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { BsLayoutSidebar } from 'react-icons/bs'
import { IoCreateOutline, IoMenuOutline, IoSettingsSharp } from 'react-icons/io5'
import { Link, Outlet, redirect, useParams, useNavigate } from 'react-router-dom'
import { createNote, getNotes } from '../api/notes'
import SettingModal from '../components/SettingModal'
import styles from './root.module.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Root = () => {
    const queryClient = useQueryClient()

    const { data: notes } = useQuery({
        queryKey: ["notes"],
        queryFn: () => getNotes()
    })

    const newNoteMutation = useMutation({
        mutationFn: () => createNote(),
        onSuccess: (newNote) => {
            console.log(newNote)
            queryClient.invalidateQueries(["notes"])
            navigate(`/notes/${newNote.noteId}`)
        }
    })

    const { loginWithRedirect, isAuthenticated, user } = useAuth0()
    const [showSettingModal, setShowSettingModal] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setShowSidebar((sideBarWasVisible) => !sideBarWasVisible)
    }

    const toggleSettingModal = () => {
        setShowSettingModal((settingModalWasVisible) => !settingModalWasVisible)
    }

    return (
        <>
            <SettingModal showModal={showSettingModal} onModalClose={toggleSettingModal} />
            <div className={styles['root-layout']}>
                <div className={`${styles['sidebar']} ${!showSidebar && styles['hidden']}`}>
                    <div className={styles['sidebar-header']}>
                        <IoMenuOutline className={styles['icon']} size="35" />
                        <div>All Notes</div>
                        <button onClick={() => newNoteMutation.mutate()} className={styles['icon-button']}>
                            <IoCreateOutline className={styles['icon']} size="27" />
                        </button>
                    </div>
                    <div className={styles['search-bar']}>
                        <input type='text'></input>
                    </div>
                    {notes?.map(note =>
                        <Link to={`/notes/${note.noteId}`} className={`${styles['note-overview']} ${note.noteId === params.noteId ? styles['selected'] : ''}`} key={note.createdAt}>{note.contentPreview || "New Note.."}</Link>
                    )}
                </div>
                <div className={styles['main-area']}>
                    <div className={styles['control-bar']}>
                        <BsLayoutSidebar onClick={toggleSidebar} className={styles['icon']} size="24" />
                        <IoSettingsSharp className={styles['icon']} size="24" onClick={toggleSettingModal} />
                        <div>{isAuthenticated ? <p>{user?.nickname}</p> : <button onClick={() => loginWithRedirect()}>Login</button>}</div>

                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Root