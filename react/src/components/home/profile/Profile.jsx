import React from "react";

const Profile = () => {
  return (
    <div className="row-12 d-flex ">

      <div className=" row-12 justify-content-center d-flex"
        style={{ backgroundColor: "gray" }}
      >
        <img
          src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
          alt=""
          style={{
            width: 150,
            height: 150
          }} />
        <p style={{
          marginTop: "150px",
        }}>username</p>
      </div>
      <div className="col-4 ustify-content-center d-flex " style={{
        backgroundColor: "red"
      }}>

        <div className="col-8"></div>
        
      </div>
    </div>
  );
};

export default Profile;
