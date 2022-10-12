import { useEffect, useRef, useState } from "react";

export default function ImageUploader({ file, onUpload = () => {} }) {
  const [previewURL, setPreviewURL] = useState();

  const fileUploader = useRef(null);

  function clickUploadInput() {
    fileUploader.current.click();
  }

  function onFileUpload(e) {
    const file = e?.target?.files[0];
    if (!file) return;

    const validateImage = document.createElement("img");
    validateImage.onload = (load) => {
      const img = load.target;

      if (img.width < 400 || img.height < 200) alert("Image is too small!");
      else if (file.size > 5 * 1024 * 1024)
        alert("Image must be less than 5MB");
      else onUpload(file);
    };
    validateImage.src = URL.createObjectURL(file);
  }

  useEffect(() => {
    if (file) {
      console.log(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <div>
      <input
        className="hidden"
        type={"file"}
        name="file-upload"
        accept=".png,.jpg.jpeg"
        ref={fileUploader}
        onChange={onFileUpload}
      />
      <button
        onClick={clickUploadInput}
        className="flex items-center justify-center h-64 border-2 border-gray-500 border-dashed hover:border-blue-600 aspect-square"
      >
        {previewURL && (
          <div
            className="w-full h-full bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${previewURL})` }}
          />
        )}
        {!previewURL && (
          <div className="p-4 text-2xl text-gray-800">
            Click to upload an image
          </div>
        )}
      </button>
    </div>
  );
}
