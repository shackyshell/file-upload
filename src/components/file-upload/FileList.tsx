import React from 'react'
import UploadProgress from './UploadProgress'

interface File {
  name: string
  size: number
}

interface FileListProps {
  files: File[]
  uploadingFiles: File[]
}

const FileList: React.FC<FileListProps> = ({ files, uploadingFiles }) => {
  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
      <h2>Uploading Files</h2>
      {uploadingFiles.map((file, index) => (
        <UploadProgress key={index} file={file} />
      ))}
    </div>
  )
}

export default FileList
