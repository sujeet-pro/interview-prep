import { memo } from "react";
import styles from "./file-size.module.css";

const sizeArr = ["bytes", "KB", "MB", "GB", "TB"];

function convertBytes(bytes: number) {
  if (bytes === 0) return null;
  const sizeIdx = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, sizeIdx))} ${sizeArr[sizeIdx]}`;
}
function FileSizeImpl({ bytes }: { bytes: number }) {
  const displayVal = convertBytes(bytes);
  if (!displayVal) return null;
  return <span className={styles.fileSize}>({displayVal})</span>;
}

export const FileSize = memo(FileSizeImpl);
