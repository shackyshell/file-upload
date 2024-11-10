import React, { useState, useEffect } from 'react'
import FileList from './FileList'
import UploadButton from './UploadButton'
import { uploadFile, fetchFiles } from '../../api/fileService'

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])

  useEffect(() => {
    const loadFiles = async () => {
        const files = await fetchFiles()
        if (files) {
            setFiles(files)
        }
    }
    loadFiles()
  }, [])

  const handleFileUpload = async (file: File) => {
    setUploadingFiles((prev) => [...prev, file])

    try {
      await uploadFile(file) // Uses chunked upload if file is large
      setFiles((prev: File[]) => [...prev, file])
    } catch (error) {
      console.error('File upload failed', error)
    } finally {
      setUploadingFiles((prev) => prev.filter((f) => f !== file))
    }
  }

  return (
    <div className='file-upload'>
      <UploadButton
        onFilesSelected={(files: File[]) => files.forEach(handleFileUpload)}
      />
      <FileList files={files} uploadingFiles={uploadingFiles} />
    </div>
  )
}

export default FileUpload
