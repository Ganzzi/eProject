import React from "react";

const Posts = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: 'start',
        justifyContent: 'space-between'
      }}>
      <div
        style={{
          height: 400,
          width: 200,
          backgroundColor: "red",
        }}>
        <img
          src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
          alt=""
          style={{
            width: 40,
          }} />
        <p>username</p>
        profile
      </div>
      

      <div style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            
          }}>
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
            <div>
              postss
            </div>
      </div>

      <div>
        list fr
      </div>


    </div>
  );
};

export default Posts;

