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
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Age, setAge] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');
  const [errors, setErrors] = useState({}); // State for error messages
  const { language } = useLanguage();

  const translations = {
    en: {
      Title: 'Sign Up',
      Fname: 'First Name',
      Lname: 'Last Name',
      Age: 'Age',
      Phone: 'Phone Number',
      Gender: 'Gender',
      Email: 'Email',
      Pass: 'Password',
      Btn: 'Sign Up',
      Ask: 'Already Have an Account? ',
      AlreadySignIn: 'Sign In',
      EmailError: 'Email already registered',
      EmptyFieldError: 'This field is required',
      InvalidEmailError: 'Invalid email address',
      InvalidPhoneError: 'Phone number must be 9 digits and start with 05',
      InvalidAgeError: 'Age must be a number',
      InvalidPasswordError: 'Password must be at least 4 characters long',
      InvalidGenderError: 'Please select a gender',
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
      Ask: 'יש לך חשבון כבר? ',
      AlreadySignIn: 'התחבר',
      EmailError: 'אימייל כבר רשום',
      EmptyFieldError: 'שדה זה חובה',
      InvalidEmailError: 'כתובת אימייל לא חוקית',
      InvalidPhoneError: 'מספר טלפון חייב להיות 9 ספרות ולהתחיל ב-05',
      InvalidAgeError: 'גיל חייב להיות מספר',
      InvalidPasswordError: 'הסיסמה חייבת להיות לפחות 4 תווים',
      InvalidGenderError: 'יש לבחור מין',
    },
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // First Name
    if (!Fname.trim()) {
      newErrors.Fname = translations[language].EmptyFieldError;
      valid = false;
    }

    // Last Name
    if (!Lname.trim()) {
      newErrors.Lname = translations[language].EmptyFieldError;
      valid = false;
    }

    // Age
    if (!Age || isNaN(Age)) {
      newErrors.Age = translations[language].InvalidAgeError;
      valid = false;
    }

    // Phone Number
    const phoneRegex = /^05\d{8}$/;
    if (!PhoneNum || !phoneRegex.test(PhoneNum)) {
      newErrors.PhoneNum = translations[language].InvalidPhoneError;
      valid = false;
    }

    // Gender
    if (!gender) {
      newErrors.Gender = translations[language].InvalidGenderError;
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.Email = translations[language].InvalidEmailError;
      valid = false;
    }

    // Password
    if (!password || password.length < 4) {
      newErrors.Password = translations[language].InvalidPasswordError;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const signup = async () => {
    if (!validateForm()) return; // Validate form before sending request

    try {
      setErrors({}); // Clear previous errors

      const response = await axios.post('/signup', {
        fname: Fname,
        lname: Lname,
        email,
        password,
        gender,
        Age,
        PhoneNum,
      });

      console.log(response.data);
      navigate('/signin');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) {
        if (err.response.data.error === 'Email already registered') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            Email: translations[language].EmailError, // Set server error message
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: 'An unexpected error occurred',
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'An unexpected error occurred',
        }));
      }
    }
  };

  return (
    <div className="w-full h-[80vh] grid items-center justify-center mt-16 text-center content-center">
      <div className="border-2 border-lime-400 p-2 rounded mt-24">
        <div className="">
          <Title getTitle={translations[language].Title} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <SignInput
              type="text"
              placeholderText={translations[language].Fname}
              setState={setFname}
              value={Fname}
            />
            {errors.Fname && <p className="text-red-500">{errors.Fname}</p>}
            <SignInput
              type="text"
              placeholderText={translations[language].Lname}
              setState={setLname}
              value={Lname}
            />
            {errors.Lname && <p className="text-red-500">{errors.Lname}</p>}
          </div>
          <SignInput
            type="text"
            placeholderText={translations[language].Age}
            setState={setAge}
            value={Age}
          />
          {errors.Age && <p className="text-red-500">{errors.Age}</p>}
          <SignInput
            type="text"
            placeholderText={translations[language].Phone}
            setState={setPhoneNum}
            value={PhoneNum}
          />
          {errors.PhoneNum && <p className="text-red-500">{errors.PhoneNum}</p>}
          <DropDown setState={setGender} gender={gender} />
          {errors.Gender && <p className="text-red-500">{errors.Gender}</p>}
          <div className="flex flex-col gap-4">
            <SignInput
              type="text"
              placeholderText={translations[language].Email}
              setState={setEmail}
              value={email}
            />
            {errors.Email && <p className="text-red-500">{errors.Email}</p>}
            <SignInput
              type="password"
              placeholderText={translations[language].Pass}
              setState={setPassword}
              value={password}
            />
            {errors.Password && (
              <p className="text-red-500">{errors.Password}</p>
            )}
            {errors.general && (
              <p className="mt-4 text-red-500">{errors.general}</p>
            )}
          </div>
          <div className="mt-5">
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
    </div>
  );
}
