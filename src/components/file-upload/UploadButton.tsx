import React from 'react'

interface UploadButtonProps {
  onFilesSelected: (files: File[]) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFilesSelected }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesSelected(Array.from(event.target.files))
    }
  }

  return (
    <div>
      <input
        type='file'
        onChange={handleFileChange}
        multiple
        aria-label='Upload files'
        className='upload-input'
      />
    </div>
  )
}

export default UploadButton
