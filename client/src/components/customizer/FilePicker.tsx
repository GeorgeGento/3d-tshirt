import { Button } from "../Button";

type FilePickerProps = {
  file: File | null;
  setFile: any;
  readFile: (type: "logo" | "full") => void;
}

const FilePicker = ({
  file, setFile, readFile
}: FilePickerProps) => {
  const handleOnClick = (type: "logo" | "full") => {
    if (!file) return alert("Select a file.");

    readFile(type);
  }

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file ? file.name : "No file selected"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => handleOnClick('logo')}
          className="text-xs"
        >Logo</Button>

        <Button
          variant="filled"
          onClick={() => handleOnClick('full')}
          className="text-xs"
        >Full</Button>
      </div>
    </div>
  )
}

export default FilePicker