import React from "react";

const Profile = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "pink",
        }}>
        <div>
          <img
            src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
            alt=""
            style={{
              width: 200,
            }}
          />
          <p>username</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          backgroundColor: "blue",
        }}>
        <div
          style={{
            height: 400,
            width: 200,
            backgroundColor: "red",
          }}>
          profile
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "green",
            flex: 1,
            alignItems: "center",
          }}>
          {/* POSTS */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}>
              <img
                src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
                alt=""
                style={{
                  width: 40,
                }}
              />
              <p>Username</p>
            </div>

            <div>
              <img
                src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1"
                alt=""
                style={{
                  width: 200,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <div>
                <p>like icon</p>
                <p>luot thich</p>
              </div>

              <div>
                <p>cmt icon</p>
                <p>luot cmt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
