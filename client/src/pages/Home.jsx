import React, { useState, useEffect } from 'react';
import PopUp from '../components/PopUp';
import CategoryBar from '../components/CategoryBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FoodNewsWindow from '../components/FoodNewsWindow';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [logIn, setlogIn] = useState(false);
  const [updatepostId, setupdatePostId] = useState();
  const [comment, setComment] = useState([]);
  // help me to render the post and comment live by use this as flag to active the use effect.
  const [renderPosts, setRenderPosts] = useState(false);
  const [categoryChosen, setCategoryChoose] = useState('');

  //check if user log in
  useEffect(() => {
    function checkLog() {
      {
        user ? setlogIn(true) : setlogIn(false);
      }
    }
    checkLog();
  }, []);

  // bring all the posts from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getposts');
        const data = response.data;

        const updatedData = data.map((post) => ({
          ...post,
          commentTry: false,
        }));

        setPosts(updatedData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [renderPosts]);

  // add a comment to array in DB (save with creation of post)
  const updateComment = (updatepostId) => {
    console.log(updatepostId);
    axios
      .put('/addComment', {
        updatepostId,
        userComment: user?.firstname,
        comment,
      })
      .then((res) => {
        console.log(res);
        // localStorage.put('/addComment');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full white">
      <div>
        <CategoryBar setCategoryChoose={setCategoryChoose} />
      </div>
      <div>
        <FoodNewsWindow />
      </div>
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`${
            logIn ? '' : ' hidden'
          } bg-blue-500 p-4 rounded-full fixed bottom-5 center shadow-md shadow-black active:shadow-none active:scale-90 z-10`}
        >
          post +
        </button>
        <div
          className={`${isOpen ? '' : ' hidden'}`}
          transition-all
          duration-300
          z-10
        >
          <h1 className="font-bold">HOME PAGE:</h1>
          <p className="m-3 font-semibold">
            nice to see u: {user?.firstname} {user?.lastname}
          </p>
          <PopUp
            renderPosts={renderPosts}
            setRenderPosts={setRenderPosts}
            setIsOpen={setIsOpen}
            user={user?.firstname}
          />
        </div>
      </div>

      <div>
        {posts
          .filter(
            (post) => categoryChosen === '' || post.postSub === categoryChosen
          )
          .map((post, i) => {
            return (
              <div
                key={post._id}
                className="text-right border-b border-gray-400 10px p-5 m-3 "
              >
                <p className="font-bold">the writer is: {post.user}</p>
                <p className="font-semibold">subject: {post.postSub}</p>
                <p className="font-semibold">post :{post.postVal}</p>
                <p className="text-center font-semibold">comment section :</p>
                {post.comments.map((p) => {
                  return (
                    <div className="text-center">
                      <p className="font-semibold">{p.userComment} :</p>
                      <p>{p.comment}</p>
                    </div>
                  );
                })}

                <button
                  onClick={() => {
                    setPosts((prevPosts) =>
                      prevPosts.map((p) =>
                        p._id === post._id
                          ? { ...p, commentTry: !p.commentTry }
                          : p
                      )
                    );
                  }}
                  className={`${
                    logIn ? '' : ' hidden'
                  }  border 100px p-2 bg-blue-500 `}
                >
                  comment
                </button>

                <div
                  className={`${post.commentTry && post._id ? '' : 'hidden'}`}
                >
                  <input
                    type="text"
                    name="comment"
                    id={`commentValue-${post._id}`} //  ID for each input
                    className=" border-2 border-black"
                    placeholder="comment here"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      setRenderPosts(!renderPosts);
                      setPosts((prevPosts) =>
                        prevPosts.map((p) =>
                          p._id === post._id ? { ...p, commentTry: false } : p
                        )
                      );
                      updateComment(post._id);
                    }}
                    className=" bg-blue-400 rounded-md p-1 shadow-md "
                  >
                    submit
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
