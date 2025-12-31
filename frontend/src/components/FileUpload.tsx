import React from 'react'

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="fileUpload"
        className="w-[375px] flex py-20 justify-center flex-col text-[2rem] rounded-[40px] border-[3px] border-dashed border-black mb-6 hover:text-[#cfa423] hover:border-[#cfa423] hover:cursor-pointer"
      >
        <span className="font-normal">Upload .csv File</span>
        <div className="mt-4 text-base">
          {file ? (
            <span>
              Currently selected: <br />
              <span className="text-[#3951C9]">{file.name}</span>
            </span>
          ) : (
            <span>No file selected</span>
          )}
        </div>
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileChange}
          required
        />
      </label>
    </div>
  )
}

export default FileUpload