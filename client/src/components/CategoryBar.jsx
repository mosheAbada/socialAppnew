import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function CategoryBar({ setCategoryChoose }) {
  const [openCategory, setOpenCategory] = useState(false);
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Categories:',
      Celiac: 'Celiac',
      Diabetics: 'Diabetics',
      LowCalorie: 'Low calorie',
      LowFat: 'Low Fat',
      All: 'All',
    },
    he: {
      title: 'קטגוריות:',
      Celiac: 'צליאק',
      Diabetics: 'סוכרתי',
      LowCalorie: 'דל קלוריות',
      LowFat: 'דל שומן',
      All: 'הכל',
    },
  };

  return (
    <div className="relative ">
      <div className="bg-lime-500 sm:flex-row p-2 flex justify-between items-center rounded-md shadow-md  gap-x-2">
        <h3 className="text-black font-bold text-xs md:text-base flex items-center ">
          {translations[language].title}
        </h3>
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="bg-lime-600 text-black font-bold w-8 h-8 flex items-center justify-center rounded cursor-pointer hover:bg-lime-700 active:scale-90"
        >
          ☰
        </button>
      </div>
      <div
        className={` top-full left-0 mt-2 w-full max-w-xs bg-lime-500  transition-transform duration-300 ease-in-out ${
          openCategory ? 'block' : 'hidden'
        } z-50`}
      >
        <button
          className="block w-full text-black font-bold px-4 py-2 rounded hover:bg-lime-600 active:scale-90"
          onClick={() => {
            setCategoryChoose('celiac');
            setOpenCategory(false);
          }}
        >
          {translations[language].Celiac}
        </button>
        <button
          className="block w-full text-black font-bold px-4 py-2 rounded hover:bg-lime-600 active:scale-90"
          onClick={() => {
            setCategoryChoose('diabetics');
            setOpenCategory(false);
          }}
        >
          {translations[language].Diabetics}
        </button>
        <button
          className="block w-full text-black font-bold px-4 py-2 rounded hover:bg-lime-600 active:scale-90"
          onClick={() => {
            setCategoryChoose('Low calorie');
            setOpenCategory(false);
          }}
        >
          {translations[language].LowCalorie}
        </button>
        <button
          className="block w-full text-black font-bold px-4 py-2 rounded hover:bg-lime-600 active:scale-90"
          onClick={() => {
            setCategoryChoose('Low Fat');
            setOpenCategory(false);
          }}
        >
          {translations[language].LowFat}
        </button>
        <button
          className="block w-full text-black font-bold px-4 py-2 rounded hover:bg-lime-600 active:scale-90"
          onClick={() => {
            setCategoryChoose('');
            setOpenCategory(false);
          }}
        >
          {translations[language].All}
        </button>
      </div>
    </div>
  );
}
