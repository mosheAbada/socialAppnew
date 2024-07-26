import React from 'react';

export default function SignButton({ btnName, func }) {
  // btn component that help creat btn's
  return (
    <div>
      <button
        onClick={func}
        className="bg-lime-500 px-4 py-2 rounded font-bold hover:bg-opacity-95 hover:scale-110 hover:text-white"
      >
        {btnName}
      </button>
    </div>
  );
}
