import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

const Posts = () => {
  const [posts, setPosts] = useState([])    
  const { user, token, setUser, setToken } = useStateContext();

  console.log();

  useEffect(() => {
    axiosClient.get("/posts").then(({ data }) => {
        console.log(data);
 setPosts(data);
    });
}, []);
  return (
    <div
      style={{

      }} 
      className="row">
      <div
        // style={{
        //   height: 400,
        //   width: 200,
        //   backgroundColor: "red",
        // }}
        className="col-3 justify-content-center d-flex"
        >
        <img
          src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
          alt=""
          style={{
            width: 40,
            height: 40
          }} />
        <p>{user.name}</p>
        
      </div>
      

      <div 
      // style={{
      //       display: 'flex',
      //       flex: 1,
      //       flexDirection: 'column',
      //     }}
          className="col-6"
          >
            <div className="posts" style={{
              display: 'flex',
              backgroundColor: 'aliceblue',
              width: '100%',
        
              
            }}>
              <form action=""className="post_box">
                <input type="text"className="post_text" 
                placeholder="What are you thinking ?"/>
              </form>
            </div>
            <div className="col"
            >
              {posts.map((item, index) => (
                <div className="col-12">
                  <div>
                {/* <img src={item.image} alt="" /> */}
<h1>{item.creator_id}</h1>
<p>{item.description}</p>
                  </div>
                  <div>
                <img src={item.image} alt="" className="img-fluid" />

                  </div>
                <br />
                </div>
              ))}
            </div>
      </div>

      <div 
      // style={{
      //       display: 'flex',
      //       flex: 1,
      //       flexDirection: 'column',
      //       backgroundColor:"blueviolet"
      //     }}
      className="col-3"
          >
        list fr
      </div>


    </div>
  );
};

export default Posts;

