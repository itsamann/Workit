import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

function ProfilePhotoSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the image state
      setImage(file);

      // Generate a preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  };

  const handleRemoveImage = () => {
    // Clear the image state
    setImage(null);
    setPreview(null);

    // Clear the input value
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-blue-600" />

          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center rounded-full absolute text-white -right-1 -bottom-1 cursor-pointer bg-blue-600"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full absolute text-white -right-1 -bottom-1 cursor-pointer"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
