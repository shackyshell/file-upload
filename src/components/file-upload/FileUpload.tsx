import React, { useState, useEffect, ChangeEvent } from 'react'
import FileList from './FileList'
import UploadButton from './UploadButton'
import { uploadFile, fetchFiles } from '../../api/fileService'

interface Props {
  token: string
}
const FileUpload: React.FC<Props> = ({ token }) => {
  //   const [organizationId, setOrganizationId] = useState<string>('')
  //   const [surveyId, setSurveyId] = useState<string>('')
  //   const [shareId, setShareId] = useState<string>('')
  const [organizationId, setOrganizationId] = useState<string>(
    'cc99471b-af43-4bfe-985e-73051e5068d2'
  )
  const [surveyId, setSurveyId] = useState<string>(
    '2ocUpNpeWLEJQ03FosWo6dVtYog'
  )
  const [shareId, setShareId] = useState<string>('default')
  const [files, setFiles] = useState<File[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])

//   useEffect(() => {
//     const loadFiles = async () => {
//       const files = await fetchFiles()
//       if (files) {
//         setFiles(files)
//       }
//     }
//     loadFiles()
//   }, [])

  const handleFileUpload = async (file: File) => {
    setUploadingFiles((prev) => [...prev, file])

    try {
      await uploadFile(token, file, organizationId, surveyId, shareId) // Uses chunked upload if file is large
      setFiles((prev: File[]) => [...prev, file])
    } catch (error) {
      console.error('File upload failed', error)
    } finally {
      setUploadingFiles((prev) => prev.filter((f) => f !== file))
    }
  }

  return (
    <div className='file-upload'>
      <div style={{marginBottom: '30px'}}>
        <h5>organization id</h5>
        <input
          type='text'
          value={organizationId}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setOrganizationId(event.target.value)
          }}
        />
        <h5>survey id</h5>
        <input
          type='text'
          value={surveyId}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSurveyId(event.target.value)
          }}
        />
        <h5>share id</h5>
        <input
          type='text'
          value={shareId}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setShareId(event.target.value)
          }}
        />
      </div>
      <UploadButton
        onFilesSelected={(files: File[]) => files.forEach(handleFileUpload)}
      />
      {/* <FileList files={files} uploadingFiles={uploadingFiles} /> */}
    </div>
  )
}

export default FileUpload
