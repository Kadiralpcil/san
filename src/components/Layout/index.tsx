import { Outlet } from 'react-router-dom'
import Topbar from '../ui/Topbar'

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
