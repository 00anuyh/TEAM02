

import { useNavigate } from "react-router-dom";
import "../css/Community2.css";


const SouvenirCommunity = () => {

    /* 유정추가 */
    /* 페이지 이동 */
    const navigate = useNavigate();
    const submitNavigate = () => {
        navigate("/Community");
    }

    return (
        <>
            <div className="warp1">

                {/* <!-- 커뮤니티 타이틀 --> */}
                <div className="toptitle">
                    <div className="titleleft" />
                    <h2>Community</h2>
                    <div className="titleright" />
                </div>
                
                <div id="community-content">
                    <div className="community-content-l">
                        <div className="insert-photo">
                            <p>사진을 첨부하세요<img src="/img/photo-insert.png" alt="photo" /> </p>
                        </div>
                        <div className="sub-photo-box">
                            <ul>
                                <li><p>+</p></li>
                                <li><p>+</p></li>
                                <li><p>-</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className="community-content-r">
                        <ul>
                            <li><div className="community-profile"></div></li>
                            <li><p>박현아 님</p></li>
                            <li><button><img src="/img/camera.png" alt="camera" /><p>사진첨부하기</p></button></li>
                        </ul>
                        <div className="community-content-title">
                            <input type="text" placeholder="제목을 입력하세요." />
                        </div>
                        <div className="community-content-text">
                            <input type="text" placeholder="내용을 입력하세요." />
                        </div>
                        <button className="text-submit" onClick={submitNavigate}><p>등록하기</p></button>
                    </div>
                </div>



                {/*  <!-- ASKICON --> */}
                {/* <div id="ask-icon">
                    <img src="/img/askicon.png" alt="ask-icon" />
                </div> */}
            </div>
        </>
    );
};




export default SouvenirCommunity;