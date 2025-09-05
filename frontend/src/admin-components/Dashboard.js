import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

export default function Dashboard() {
  return (
    <div>
        <AdminNavbar/>
        <Outlet/>
    </div>
  )
}

