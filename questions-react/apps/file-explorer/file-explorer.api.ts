import type { InputFolder, FolderNode, FileNode } from './file-explorer.types'

const base = import.meta.env.BASE_URL

let cachePromise: Promise<InputFolder>
export async function getFileExplorerData(): Promise<FolderNode> {
  if (!cachePromise) {
    cachePromise = fetchFileExplorerData()
  }
  const data = await cachePromise
  const transformed = transformFolder(data)
  return transformed
}

async function fetchFileExplorerData(): Promise<InputFolder> {
  const res = await fetch(`${base}/data/file-tree.json`)
  const data = await res.json()
  return data
}

export function transformFolder(inputFolder: InputFolder, dirs: string[] = []): FolderNode {
  let totalSize = 0
  const children: FolderNode['children'] = []

  const transformedFolder: FolderNode = {
    isOpen: false,
    type: 'folder',
    name: inputFolder.name,
    dirs: [...dirs],
    size: totalSize,
    children,
  }

  for (const child of inputFolder.children) {
    if (child.type === 'file') {
      children.push({
        ...child,
        dirs: [...dirs, inputFolder.name],
      } satisfies FileNode)
      totalSize += child.size
    } else if (child.type === 'folder') {
      const folder = transformFolder(child, [...dirs, inputFolder.name])
      children.push(folder)
      totalSize += folder.size
    }
  }

  transformedFolder.size = totalSize
  return transformedFolder
}
