import { FileNode, FolderNode } from "./file-explorer.types";

type Node = FileNode | FolderNode

export function toggleOpenTree(node: Node, dirs: string[]): Node {
    const [currName, ...nextDirs] = dirs
    if (node && currName && node.type === 'folder' && node.name === currName) {
        return {
            ...node,
            isOpen: nextDirs.length ? node.isOpen : !node.isOpen,
            children: node.children.map(child => toggleOpenTree(child, [...nextDirs]))
        } satisfies FolderNode
    }
    return node
}

export function updateFileNodeSize(node: Node, dirs: string[], delta: number): Node {
    const [currName, ...nextDirs] = dirs
    if (!(node && currName && node.name === currName)) {
        return node
    }
    if (node.type === 'folder') {
        const folder: FolderNode = {
            ...node,
            size: node.size + delta,
            children: node.children.map(child => updateFileNodeSize(child, [...nextDirs], delta))
        }
        return folder
    } else if (node.type === 'file') {
        const file: FileNode = {
            ...node,
            size: node.size + delta
        }
        return file
    }

    return node
}