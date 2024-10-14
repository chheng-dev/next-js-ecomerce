import { X } from 'lucide-react';
import React from 'react'

const ModalPreviewImage = ({isOpen, item, onClose}) => {


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <img
            src={item}
            alt="Selected Preview"
            className="max-w-full max-h-full rounded-md"
          />
          <button onClick={onClose} className="absolute top-4 right-4 text-white">
            <X />
          </button>
        </div>
      )}
    </>
  ) 
}

export default ModalPreviewImage
