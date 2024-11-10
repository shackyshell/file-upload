import axios from 'axios'

export const fetchFiles = async () => {
  const response = await axios.get('/api/files')
  return response.data.files
}

export const uploadFile = async (
  token: string,
  file: File,
  organizationId: string,
  surveyId: string,
  shareId: string
) => {
  //   if (file.size > 5 * 1024 * 1024) {
  //     return uploadFileInChunks(file)
  //   }

  const formData = new FormData()
  formData.append('file', file)
  const url = `${
    import.meta.env.VITE_API_URL
  }/surveys/${organizationId}/${surveyId}/shares/${shareId}/preview-image`
  console.log('url', url)
  await axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// export const uploadFileInChunks = async (
//   file: File,
//   onProgress?: (progress: number) => void
// ) => {
//   const chunkSize = 1024 * 1024 // 1MB
//   const totalChunks = Math.ceil(file.size / chunkSize)
//   let progress = 0

//   for (let i = 0; i < totalChunks; i++) {
//     const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize)
//     const formData = new FormData()
//     formData.append('file', chunk)
//     formData.append('currentChunkIndex', String(i))
//     formData.append('totalChunks', String(totalChunks))

//     await axios.post('/api/upload-chunks', formData)

//     progress = Math.round(((i + 1) / totalChunks) * 100)
//     if (onProgress) onProgress(progress)
//   }
// }
