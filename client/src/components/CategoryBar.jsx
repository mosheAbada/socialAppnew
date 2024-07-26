import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function CategoryBar({ setCategoryChoose }) {
  const [openCategory, setOpenCategory] = useState(false);
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Categorys :',
      Celiac: 'Celiac',
      Diabetics: 'Diabetics',
      LowCalorie: 'Low calorie',
      LowFat: 'Low Fat',
      All: 'All',
    },
    he: {
      title: 'קטגוריות  :',
      Celiac: 'צליאק',
      Diabetics: 'סוכרתי',
      LowCalorie: 'דל קלוריות',
      LowFat: 'דל שומן',
      All: 'הכל',
    },
  };
  return (
    <div className="bg-lime-500 m-2 px-12 py-2 flex justify-between  items-center fixed top-40  rounded-md  z-20">
      <div className="relative">
        <h3 className=" text-black font-bold  flex items-center justify-center rounded ">
          {translations[language].title}
        </h3>
        <h1
          onClick={() => setOpenCategory(!openCategory)}
          className="bg-lime-600 text-black font-bold w-12 h-12 flex  items-center justify-center rounded cursor-pointer hover:bg-lime-700 active:scale-90 "
        >
          ☰
        </h1>

        <div
          className={`absolute top-full left-0 mt-2 bg-lime-500 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            openCategory ? 'block' : 'hidden'
          }`}
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
    </div>
  );
}
