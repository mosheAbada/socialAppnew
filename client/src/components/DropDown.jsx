import React, { useState } from 'react';

export default function DropDown({ setState, gender }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //choose gemder drop down
  return (
    <div className="flex">
      <div className="">
        <button
          onClick={handleDropdown}
          className="border-2 border-blue-500 w-full px-4 py-1 rounded"
        >
          {gender ? gender : 'choose gender'}
        </button>
        <div className={`border border-black mt-2 ${!isOpen ? 'hidden' : ''}`}>
          <p
            onClick={() => {
              setState('male');
              setIsOpen(!isOpen);
            }}
            className="hover:bg-blue-500 cursor-pointer"
          >
            Male
          </p>
          <p
            onClick={() => {
              setState('female');
              setIsOpen(!isOpen);
            }}
            className="hover:bg-blue-500 cursor-pointer"
          >
            Female
          </p>
          <p
            onClick={() => {
              setState('rather not to say');
              setIsOpen(!isOpen);
            }}
            className="hover:bg-blue-500 cursor-pointer"
          >
            Rather not to say
          </p>
        </div>
      </div>
    </div>
  );
}
