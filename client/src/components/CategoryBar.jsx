import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function CategoryBar({ setCategoryChoose }) {
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className="bg-blue-500 p-4 flex w-full justify-between items-center border-b border-black-400">
      <h1
        onClick={() => {
          setOpenCategory(!openCategory);
        }}
        className=" m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90"
      >
        choose category
      </h1>
      <button
        className={`${
          openCategory ? '' : 'hidden'
        } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
        onClick={() => {
          setCategoryChoose('celiac');
          setOpenCategory(!openCategory);
        }}
      >
        celiac
      </button>
      <button
        className={`${
          openCategory ? '' : 'hidden'
        } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
        onClick={() => {
          setCategoryChoose('diabetics');
          setOpenCategory(!openCategory);
        }}
      >
        diabetics
      </button>
      <button
        className={`${
          openCategory ? '' : 'hidden'
        } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
        onClick={() => {
          setCategoryChoose('Low calorie');
          setOpenCategory(!openCategory);
        }}
      >
        Low calorie
      </button>
      <button
        className={`${
          openCategory ? '' : 'hidden'
        } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
        onClick={() => {
          setCategoryChoose('Low Fat');
          setOpenCategory(!openCategory);
        }}
      >
        Low Fat
      </button>
      <button
        className={`${
          openCategory ? '' : 'hidden'
        } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
        onClick={() => {
          setCategoryChoose('');
          setOpenCategory(!openCategory);
        }}
      >
        All
      </button>
    </div>
  );
}
