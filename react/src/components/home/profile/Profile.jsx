import React from "react";
// import { useStateContext } from "../../../contexts/ContextProvider";
// import { Height } from "@material-ui/icons";


const Profile = () => {
  // const { user, token, setUser, setToken } = useStateContext();
  console.log();

  return (
    <div >
      <div className=" row justify-content-center d-flex" 
      style={{
        backgroundColor:"GrayText",
      }}>
        <img
          src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
          alt=""
          style={{
            width: 200,
            height: 200,
          }}
        />
        {/* <p className="justify-content-center d-flex">{user.name}</p> */}
        </div>
<div className="col" style={{
  backgroundColor:"#dcdcdc",
  height:"400px",

}}>

</div>
    </div>
  );
}



export default Profile;
