import type { ReactNode } from 'react'

const AppLayout = ({ children }: { children: ReactNode }) => {
  return <main className="mx-auto flex-1 max-w-6xl px-4 py-8">{children}</main>
}

export default AppLayout
