import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminProtected = ({ Compo }) => {
    const navigate = useNavigate()
    const { auth } = useSelector(state => state.user)
    useEffect(() => {
        if (auth == null) {
            navigate("/")
        }
        if (auth && !auth.loger) {
            navigate("/")
        }
        if (auth && auth.loger === "User") {
            navigate("/")
        }
    }, [auth])

    return auth && auth.loger === "Admin" ? <Compo /> : navigate("/")
}


export default AdminProtected