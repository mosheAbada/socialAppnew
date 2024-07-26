import React from 'react';

export default function SignInput({ type, placeholderText, setState }) {
  // component for inputs make the code easier 2 read
  return (
    <div>
      <input
        className="border-2 border-lime-500 rounded py-1 px-2 m-2 font-bold"
        type={type}
        placeholder={placeholderText}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
}
