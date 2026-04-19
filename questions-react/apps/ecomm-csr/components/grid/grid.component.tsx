import { FC, PropsWithChildren } from 'react'

export type GridProps = unknown

const style = {
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
}
export const Grid: FC<PropsWithChildren<GridProps>> = ({ children }) => {
  return (
    <div className="grid gap-4" style={style}>
      {children}
    </div>
  )
}
