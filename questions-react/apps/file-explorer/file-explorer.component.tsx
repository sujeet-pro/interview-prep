import { useCallback, useEffect, useState } from 'react'
import { useFileExplorerData } from './file-explorer.hook'
import { FolderTree } from './folder-tree/folder-tree.component'
import { FileNode, FolderNode } from './file-explorer.types'
import { updateFileNodeSize, toggleOpenTree } from './file-explorer.utils'

export function FileExplorer() {
  const fileExplorerData = useFileExplorerData()
  const [tree, setTree] = useState<FolderNode | FileNode | null>(null)

  const updateFileSize = useCallback((node: FileNode, delta: number) => {
    setTree(prevTree => {
      if (prevTree === null) return null
      const dirs = [...node.dirs, node.name]
      const updatedTree = updateFileNodeSize(prevTree, dirs, delta)
      return updatedTree
    })
  }, [])

  const toggleOpen = useCallback((node: FolderNode) => {
    setTree(prevTree => {
      if (!prevTree) return prevTree
      const dirs = [...node.dirs, node.name]
      const updatedTree = toggleOpenTree(prevTree, dirs)
      return updatedTree
    })
  }, [])

  useEffect(() => {
    if (fileExplorerData) {
      setTree(fileExplorerData)
    }
  }, [fileExplorerData])

  if (!tree) return null
  return (
    <div>
      <section>
        <button type="button" onClick={() => setTree(fileExplorerData)}>
          Reset
        </button>
      </section>
      <hr className="my-4" />
      {tree.type === 'folder' ? (
        <FolderTree folder={tree} toggleOpen={toggleOpen} updateFileSize={updateFileSize} />
      ) : null}
    </div>
  )
}
