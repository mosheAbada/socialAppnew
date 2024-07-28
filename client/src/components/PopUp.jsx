import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function PopUp({
  setIsOpen,
  user,
  setRenderPosts,
  renderPosts,
}) {
  const navigate = useNavigate();
  const userName = user;
  const [postVal, setPostVal] = useState('');
  const [postSub, setPostSub] = useState('');
  const [comments, setComments] = useState([]);
  const [postSubEmpty, setPostSubEmpty] = useState('');
  const [postValEmpty, setPostValEmpty] = useState('');
  const { language } = useLanguage();

  const translations = {
    en: {
      Hi: 'Add Your Recipe',
      title: '-- Choose Categorys --',
      Celiac: 'Celiac',
      Diabetics: 'Diabetics',
      LowCalorie: 'Low calorie',
      LowFat: 'Low Fat',
      Value: 'Enter Recipe',
      Create: 'Create Post',
      SubjectEmpty: 'Choose category',
      ValueEmpty: 'Enter your recipe',
    },
    he: {
      Hi: 'העלה את המתכון שלך',
      title: '-- בחר קטגוריה --',
      Celiac: 'צליאק',
      Diabetics: 'סוכרתי',
      LowCalorie: 'דל קלוריות',
      LowFat: 'דל שומן',
      Value: 'הכנס מתכון',
      Create: 'פרסם',
      SubjectEmpty: ' בחר קטגוריה',
      ValueEmpty: 'הכנס מתכון',
    },
  };

  const clearPostData = () => {
    setPostVal('');
    setPostSub('');
  };

  const post = () => {
    if (postSub !== '' && postVal !== '') {
      setIsOpen(false);
      setPostSubEmpty('');
      setPostValEmpty('');
      axios
        .post('/post', {
          userName,
          postVal,
          postSub,
          comments,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem('post', JSON.stringify(res.data));
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (postSub === '') {
      setPostValEmpty('');
      setPostSubEmpty(translations[language].SubjectEmpty);
    } else if (postVal === '') {
      setPostSubEmpty('');
      setPostValEmpty(translations[language].ValueEmpty);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      <div className="relative w-[300px] h-[300px] p-4 bg-white rounded-md shadow-md shadow-black z-50">
        <button
          onClick={() => {
            clearPostData();
            setIsOpen(false);
          }}
          className="absolute top-2 right-2"
        >
          X
        </button>
        <p>
          {user}, {translations[language].Hi}{' '}
        </p>
        <div className="grid gap-4 mt-4">
          <select
            name="category"
            value={postSub}
            onChange={(e) => setPostSub(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">{translations[language].title}</option>
            <option value="celiac">{translations[language].Celiac}</option>
            <option value="diabetics">
              {translations[language].Diabetics}
            </option>
            <option value="Low calorie">
              {translations[language].LowCalorie}
            </option>
            <option value="Low Fat">{translations[language].LowFat}</option>
          </select>

          <p className="text-rose-700">{postSubEmpty}</p>
          <textarea
            className="border border-lime-400 p-2 w-[100px] rounded-lg focus:w-[200px] transition-all duration-150"
            value={postVal}
            placeholder={translations[language].Value}
            onChange={(e) => setPostVal(e.target.value)}
          />
          <p className="text-rose-700">{postValEmpty}</p>
        </div>
        <div className="absolute bottom-1 flex w-full justify-center">
          <button
            onClick={() => {
              setRenderPosts(!renderPosts);
              clearPostData();
              post();
            }}
            className="bg-lime-400 rounded-md p-2 shadow-md shadow-black active:shadow-none active:scale-90 z-10"
          >
            {translations[language].Create}
          </button>
        </div>
      </div>
    </div>
  );
}
