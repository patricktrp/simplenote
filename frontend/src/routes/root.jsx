import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { BsLayoutSidebar } from 'react-icons/bs'
import { IoCreateOutline, IoMenuOutline } from 'react-icons/io5'
import { Outlet } from 'react-router-dom'
import { createNote, getNotes } from '../api/notes'
import styles from './root.module.css'

export const loader = async () => {
    const notes = await getNotes()
    return notes
}

export const action = async () => {
    const note = await createNote();
    return note;
}

const Root = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0()
    const [showSidebar, setShowSidebar] = useState(true)
    
    const toggleSidebar = () => {
        setShowSidebar((oldVal) => {
            return !oldVal
        })
    }

    return (
        <div className={styles['root-layout']}>
            <div className={`${styles['sidebar']} ${!showSidebar ? styles['hidden'] : ''}`}>
                <div className={styles['sidebar-header']}>
                    <IoMenuOutline className={styles['icon']} size="1.2em"/>
                    <div>All Notes</div>
                    <IoCreateOutline className={styles['icon']} size="1.2em"/>
                </div>
                <div className={styles['search-bar']}>
                    <input type='text'></input>
                </div>
            </div>
            <div className={styles['main-area']}>
                <div className={styles['control-bar']}>
                    <BsLayoutSidebar onClick={toggleSidebar} className={styles['icon']} size="1em"/>
                    <div>{isAuthenticated ? <p>logged in</p> : <button onClick={() => loginWithRedirect()}>Login</button>}</div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Root