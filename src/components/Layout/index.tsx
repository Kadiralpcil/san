import { Outlet } from "react-router-dom"
import Topbar from "./Topbar"

const Layout = () => {
  return (
    <>
      <Topbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
