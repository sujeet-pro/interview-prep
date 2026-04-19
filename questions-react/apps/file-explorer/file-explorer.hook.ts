import { useEffect, useState } from "react"
import { getFileExplorerData } from "./file-explorer.api"
import { FolderNode } from "./file-explorer.types"

export function useFileExplorerData() {
    const [fileExplorerData, setData] = useState<FolderNode | null>(null)
    useEffect(() => {
        getFileExplorerData().then(data => {
            setData(data)
        })
    }, [])
    return fileExplorerData
}