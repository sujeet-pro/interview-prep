export type InputFile = {
    type: 'file'
    name: string
    size: number
}

export type InputFolder = {
    type: 'folder'
    name: string
    children: (InputFile | InputFolder)[]
}

export type FileNode = {
    type: 'file'
    name: string
    size: number
    dirs: string[]

}

export type FolderNode = {
    type: 'folder'
    name: string
    dirs: string[]
    size: number
    isOpen: boolean
    children: (FileNode | FolderNode)[]
}



