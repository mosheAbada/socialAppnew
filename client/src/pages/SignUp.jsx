import React, { useState } from 'react';
import Title from '../components/Title';
import SignInput from '../components/SignInput';
import SignButton from '../components/SignButton';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/DropDown';
import axios from 'axios';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function SignUp() {
  const navigate = useNavigate();
  const [Fname, setFname] = useState();
  const [Lname, setLname] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Age, setAge] = useState();
  const [PhoneNum, setPhoneNum] = useState();
  const { language } = useLanguage();

  const translations = {
    en: {
      Title: 'Sign Up ',
      Fname: 'First Name',
      Lname: 'Last Name',
      Age: 'Age',
      Phone: 'PhoneNumber',
      Gender: 'Gender',
      Email: 'Email',
      Pass: 'PassWord',
      Btn: 'Sign In',
      Ask: 'Already Have Account ? ',
      AlreadySignIn: 'Sign In',
    },
    he: {
      Title: 'הירשם',
      Fname: 'שם פרטי',
      Lname: 'שם משפחה',
      Age: 'גיל',
      Phone: 'פלאפון',
      Gender: 'מין',
      Email: 'אימייל',
      Pass: 'סיסמא',
      Btn: 'הרשם',
      Ask: 'יש לך חשבון כבר ? ',
      AlreadySignIn: 'התחבר',
    },
  };

  const signup = () => {
    axios
      .post('/signup', {
        fname: Fname,
        lname: Lname,
        email,
        password,
        gender,
        Age,
        PhoneNum,
      })
      .then((res) => {
        console.log(res.data);
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="border w-full h-[80vh] grid items-center justify-center">
      <div className="bg-lime-500 m-2 px-5 py-2 flex justify-between  items-center fixed top-20  rounded-md  z-20">
        <LanguageSwitcher />
      </div>
      <div className="border-2 border-lime-400 p-10 rounded">
        <div className="mb-10">
          <Title getTitle={translations[language].Title} />
        </div>
        <SignInput
          type={'text'}
          placeholderText={translations[language].Fname}
          setState={setFname}
        />
        <SignInput
          type={'text'}
          placeholderText={translations[language].Lname}
          setState={setLname}
        />
        <SignInput
          type={'text'}
          placeholderText={translations[language].Age}
          setState={setAge}
        />
        <SignInput
          type={'text'}
          placeholderText={translations[language].Phone}
          setState={setPhoneNum}
        />
        <DropDown setState={setGender} gender={gender} />
        <SignInput
          type={'text'}
          placeholderText={translations[language].Email}
          setState={setEmail}
        />
        <SignInput
          type={'password'}
          placeholderText={translations[language].Pass}
          setState={setPassword}
        />
        <div className="mt-10">
          <SignButton btnName={translations[language].Btn} func={signup} />
        </div>
        <p className="mt-4">
          {translations[language].Ask}
          <span
            onClick={() => {
              navigate('/signin');
            }}
            className="font-bold hover:underline cursor-pointer hover:opacity-70 hover:scale-105"
          >
            {translations[language].AlreadySignIn}
          </span>
        </p>
      </div>
    </div>
  );
}
