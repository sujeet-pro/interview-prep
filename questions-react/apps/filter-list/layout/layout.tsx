import { Outlet } from 'react-router'
import { Header } from './header'

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow p-4">
        <Outlet />
      </main>
    </div>
  )
}
