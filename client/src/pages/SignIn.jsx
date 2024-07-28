import React, { useState } from 'react';
import Title from '../components/Title';
import SignInput from '../components/SignInput';
import SignButton from '../components/SignButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { language } = useLanguage();

  const translations = {
    en: {
      Title: 'Sign In',
      Email: 'Email',
      Pass: 'Password',
      Btn: 'Sign In',
      Ask: 'Not signed in yet?',
      NotSignUp: 'Sign Up',
      EmailError: 'Email not registered',
      PasswordError: 'Incorrect password',
    },
    he: {
      Title: 'התחברות',
      Email: 'אימייל',
      Pass: 'סיסמא',
      Btn: 'התחבר',
      Ask: 'אין לך משתמש?',
      NotSignUp: 'הירשם כאן',
      EmailError: 'אימייל לא רשום',
      PasswordError: 'סיסמא לא נכונה',
    },
  };

  const signin = (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    setEmailError(''); // Clear previous errors
    setPasswordError('');

    axios
      .post('/signin', { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.error === 'Email not registered') {
          setEmailError(translations[language].EmailError);
        } else if (err.response.data.error === 'Incorrect password') {
          setPasswordError(translations[language].PasswordError);
        }
      });
  };

  return (
    <div className="border w-full h-[80vh] grid items-center justify-center">
      <div className="bg-lime-500 m-2 px-5 py-2 flex justify-between items-center fixed top-20 rounded-md z-20">
        <LanguageSwitcher />
      </div>
      <div className="border-2 border-lime-400 p-7  rounded">
        <form onSubmit={signin}>
          <div className="mb-10">
            <Title getTitle={translations[language].Title} />
          </div>
          <SignInput
            type="text"
            placeholderText={translations[language].Email}
            setState={setEmail}
          />
          {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          <SignInput
            type="password"
            placeholderText={translations[language].Pass}
            setState={setPassword}
          />
          {passwordError && (
            <p className="text-red-500 mt-1">{passwordError}</p>
          )}
          <div className="mt-10">
            <SignButton btnName={translations[language].Btn} func={signin} />
          </div>
        </form>
        <p className="mt-4">
          {translations[language].Ask}
          <span
            onClick={() => {
              navigate('/signup');
            }}
            className="font-bold hover:underline cursor-pointer hover:opacity-70 hover:scale-105"
          >
            {translations[language].NotSignUp}
          </span>
        </p>
      </div>
    </div>
  );
}
