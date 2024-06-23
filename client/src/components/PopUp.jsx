import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

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

  const clearPostData = () => {
    setPostVal('');
    setPostSub('');
  };

  const post = () => {
    setIsOpen(false);
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
  };
  // pop up to create post by user
  return (
    <div className="w-full flex justify-center items-center  fixed backdrop-blur-lg">
      <div className=" shadow-md shadow-black w-[300px] h-[300px] rounded-md relative">
        <button
          onClick={() => {
            clearPostData();
            setIsOpen(false);
          }}
          className="flex w-full justify-end p-2"
        >
          X
        </button>
        <p>hello {user} create your post </p>
        <div className="grid gap-4 ml-4">
          <select
            name="pets"
            id="pet-select"
            value={postSub}
            onChange={(e) => setPostSub(e.target.value)}
          >
            <option value="">--Please choose category--</option>
            <option value="celiac">celiac</option>
            <option value="diabetics">diabetics</option>
            <option value="Low calorie">Low calorie</option>
            <option value="Low Fat">Low Fat</option>
          </select>

          <textarea
            className="border border-blue-400 p-2 w-[100px] rounded-lg focus:w-[200px] transition-all duration-150"
            value={postVal}
            type="text"
            placeholder="content:"
            onChange={(e) => setPostVal(e.target.value)}
          />
        </div>
        <div className="absolute bottom-1 flex  w-full justify-center">
          <button
            onClick={() => {
              setRenderPosts(!renderPosts);
              clearPostData();
              post();
            }}
            className=" bg-blue-400 rounded-md p-2 shadow-md  shadow-black active:shadow-none active:scale-90 z-10"
          >
            create post
          </button>
        </div>
      </div>
    </div>
  );
}
