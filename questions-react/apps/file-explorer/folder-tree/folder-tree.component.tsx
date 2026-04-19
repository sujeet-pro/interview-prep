import { memo } from 'react'
import { FolderNode, FileNode } from '../file-explorer.types'
import { FileSize } from '../file-size/file-size'
import styles from './folder-tree.module.css'

const ICON_MAP = {
  file: '📄',
  folderClosed: '📁',
  folderOpen: '📂',
}

function FolderTreeImpl({
  folder,
  updateFileSize,
  toggleOpen,
}: {
  folder: FolderNode
  updateFileSize: (node: FileNode, size: number) => void
  toggleOpen: (node: FolderNode) => void
}) {
  return (
    <div>
      <div onClick={() => toggleOpen(folder)}>
        <span>{folder.isOpen ? ICON_MAP.folderOpen : ICON_MAP.folderClosed}</span>
        <span>{folder.name}</span>
        <FileSize bytes={folder.size} />
      </div>
      {folder.isOpen ? (
        <ul>
          {folder.children.map(child => {
            if (child.type === 'file') {
              return (
                <li className={styles.fileNameRow} key={child.name + child.size}>
                  <span>{ICON_MAP.file}</span>
                  <span>{child.name}</span>
                  <FileSize bytes={child.size} />
                  <button className={styles.changeSizeBtn} onClick={() => updateFileSize(child, 500000)}>
                    IncreaseSize
                  </button>
                </li>
              )
            } else if (child.type === 'folder') {
              return (
                <li key={child.name}>
                  <FolderTree toggleOpen={toggleOpen} folder={child} updateFileSize={updateFileSize} />
                </li>
              )
            }
            return null
          })}
        </ul>
      ) : null}
    </div>
  )
}

export const FolderTree = memo(FolderTreeImpl)
