import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function DropDown({ setState, gender }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const translations = {
    en: {
      Title: 'Choose Gender',
      Male: 'Male',
      Female: 'Female',
      Other: 'Other',
    },
    he: {
      Title: 'בחר מין ',
      Male: 'גבר',
      Female: 'אישה',
      Other: 'מעדיף לא לציין',
    },
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //choose gemder drop down
  return (
    <div className="flex">
      <div className="">
        <button
          onClick={handleDropdown}
          className="border-2 border-lime-500 w-full px-4 py-1 rounded"
        >
          {gender ? gender : translations[language].Title}
        </button>
        <div className={`border border-lime-500 mt-2 ${!isOpen ? 'hidden' : ''}`}>
          <p
            onClick={() => {
              setState('male');
              setIsOpen(!isOpen);
            }}
            className="hover:bg-blue-500 cursor-pointer"
          >
            {translations[language].Male} 
          </p>
          <p
            onClick={() => {
              setState('female');
              setIsOpen(!isOpen);
            }}
            className="hover:bg-pink-500 cursor-pointer"
          >
            {translations[language].Female} 
          </p>
          <p
            onClick={() => {
              setState('rather not to say');
              setIsOpen(!isOpen);
            }}
            className="hover:bg-lime-500 cursor-pointer"
          >
            {translations[language].Other} 
          </p>
        </div>
      </div>
    </div>
  );
}
