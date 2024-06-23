import React, { useState } from 'react';
import Title from '../components/Title';
import SignInput from '../components/SignInput';
import SignButton from '../components/SignButton';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/DropDown';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();
  const [Fname, setFname] = useState();
  const [Lname, setLname] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Age, setAge] = useState();
  const [PhoneNum, setPhoneNum] = useState();

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
      <div className="border-2 border-blue-400 p-10 rounded">
        <div className="mb-10">
          <Title getTitle={'Sign up'} />
        </div>
        <SignInput
          type={'text'}
          placeholderText={'First Name'}
          setState={setFname}
        />
        <SignInput
          type={'text'}
          placeholderText={'Last Name'}
          setState={setLname}
        />
        <SignInput type={'text'} placeholderText={'Age'} setState={setAge} />
        <SignInput
          type={'text'}
          placeholderText={'PhoneNum'}
          setState={setPhoneNum}
        />
        <DropDown setState={setGender} gender={gender} />
        <SignInput
          type={'text'}
          placeholderText={'Email address'}
          setState={setEmail}
        />
        <SignInput
          type={'password'}
          placeholderText={'Password'}
          setState={setPassword}
        />
        <div className="mt-10">
          <SignButton btnName={'Sign up'} func={signup} />
        </div>
        <p className="mt-4">
          already registered?{' '}
          <span
            onClick={() => {
              navigate('/signin');
            }}
            className="font-bold hover:underline cursor-pointer hover:opacity-70 hover:scale-105"
          >
            sign in
          </span>
        </p>
      </div>
    </div>
  );
}
