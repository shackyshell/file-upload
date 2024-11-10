import React, { useEffect, useState } from 'react'
import { uploadFileInChunks } from '../../api/fileService'

interface UploadProgressProps {
  file: File
}

const UploadProgress: React.FC<UploadProgressProps> = ({ file }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const upload = async () => {
      await uploadFileInChunks(file, (p) => setProgress(p))
    }
    upload()
  }, [file])

  return (
    <div>
      <span>{file.name}</span>
      <progress value={progress} max='100'>
        {progress}%
      </progress>
    </div>
  )
}

export default UploadProgress
