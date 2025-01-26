import { FC, PropsWithChildren } from 'react'
import styles from './grid.module.css'

export type GridProps = unknown

export const Grid: FC<PropsWithChildren<GridProps>> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>
}
