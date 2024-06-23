import React, { useState } from 'react';
import Title from '../components/Title';
import SignInput from '../components/SignInput';
import SignButton from '../components/SignButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signin = () => {
    axios
      .post('/signin', {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="border w-full h-[80vh] grid items-center justify-center">
      <div className="border-2 border-blue-400 p-10 rounded">
        <div className="mb-10">
          <Title getTitle={'Sign in'} />
        </div>
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
          <SignButton btnName={'Sign in'} func={signin} />
        </div>

        <p className="mt-4">
          not registered yet?{' '}
          <span
            onClick={() => {
              navigate('/signup');
            }}
            className="font-bold hover:underline cursor-pointer hover:opacity-70 hover:scale-105"
          >
            sign up
          </span>
        </p>
      </div>
    </div>
  );
}
