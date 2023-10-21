import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="vh-100 d-flex align-items-center">
    <Outlet></Outlet>
  </div>
  )
}
