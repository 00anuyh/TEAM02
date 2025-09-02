import React from "react";
import { useNavigate } from "react-router-dom";


import "../css/Community.css";

import posts from "../data/CommunityData.json";

// 단일 카드 컴포넌트
function ComCard({ post }) {

  /* 유정추가 */
  /* 페이지 이동 */
  const navigate = useNavigate();
  const CommunityDetailNavigate = () => {
    navigate("/Community3");
  }

  return (
    <div className="comBox">
      <div className="comImg" onClick={CommunityDetailNavigate}>
        <img src={post.image} alt="커뮤이미지" />
      </div>
      <div className="comInpo">
        <div className="comUser">
          <img src={post.userImg} alt="커뮤회원" width="60px" />
          <p>{post.user}</p>
        </div>
        <div className="comText" onClick={CommunityDetailNavigate}>{post.text}</div>
      </div>
    </div>
  );
}

// 전체 페이지
export default function Community() {
  const navigate = useNavigate();

  const writeNavigate = () => {
    navigate("/Community2");
  }

  return (
    <div className="warp1">
      <div className="toptitle">
        <div className="titleleft" />
        <h2>Community</h2>
        <div className="titleright" />
      </div>

      {/* 탭 */}
      <div className="comTap">
        <button type="button" className="combtn">내 글 찾기</button>
        <button type="button" className="combtn">나의 활동</button>
        {/* 유정추가 페이지이동 */}
        <button type="button" className="combtn" onClick={writeNavigate}>작성하기</button>
      </div>

      {/* 리스트: map() */}
      <div className="comList">
        {posts.map((post, idx) => (
          <React.Fragment key={post.id}>
            <ComCard post={post} />
            {idx !== posts.length - 1 && <div className="comLine" />}
          </React.Fragment>
        ))}
        <div className="comPageNum">페이지 수</div>
      </div>
    </div>
  );
}