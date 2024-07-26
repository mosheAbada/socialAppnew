// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// export default function () {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/getposts');
//         console.log(response.data);
//         setPosts(response.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   // post schema . i never used it but it here haha
//   return (
//     <div>
//       {posts.map((post, i) => {
//         return (
//           <div key={post._id} className="border 10px p-3">
//             <h1>the writer is :{post.user}</h1>
//             <p> category : {post.postSub}</p>
//             <p>{post.postVal}</p>
//             <p>{post.comments}</p>

//             <button
//               onClick={() => {
//                 setCommentTry(!commentTry);
//               }}
//               className="border 100px p-2 bg-blue-400 "
//             >
//               Comment
//             </button>

//             <div className={`${commentTry && post._id ? '' : 'hidden'}`}>
//               <input
//                 type="text"
//                 name="comment"
//                 id="commentValue"
//                 className=" border-2 border-black"
//                 placeholder="comment here"
//               />
//               <button
//                 onClick={() => {
//                   setCommentTry(false);
//                 }}
//                 className=" bg-blue-400 rounded-md p-1 shadow-md "
//               >
//                 send comment
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
