
import "../css/Community3.css";


const CommunityDetail = () => {


    return (
        <>
            <div className="warp1">

                {/* 커뮤니티 타이틀 */}
                <div className="toptitle">
                    <div className="titleleft" />
                    <h2>Community</h2>
                    <div className="titleright" />
                </div>
                
                <div id="comdetail_community-content">
                    <div className="comdetail_community-content-l">
                        <div className="insert-photo">
                            <img src="/img/com-img1.png" alt="photo" />
                        </div>
                        <div className="sub-photo-box">
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="comdetail_community-content-r">
                        <ul>
                            <li><div className="community-profile"></div></li>
                            <li><p className="detail-name">닉네임 님</p></li>
                            <li><img src="/img/edit.png" alt="edit" />
                                <p className="detail-editor" >수정</p></li>
                            <li><img src="/img/delete2.png" alt="delete2" />
                                <p className="detail-editor" >삭제</p></li>
                        </ul>
                        <div className="comdetail_community-content-text">
                            <p>독특하게 앞쪽에 절개 디자인이 들어가서 은은하게 돋보이는 것 같아요! 소재때문에 마냥 캐쥬얼해보이지 않고 격식있는 자리에서도 입을 수 있을 것 같습니다. 다만 먼지는 잘 붙고 또 잘 보이는 편이에요..!독특하게 앞쪽에 절개 디자인이 들어가서 은은하게 돋보이는 것 같아요! 소재때문에 마냥 캐쥬얼해보이지 않고 격식있는 자리에서도 입을 수 있을 것 같습니다. 다만 먼지는 잘 붙고 또 잘 보이는 편이에요..!독특하게 앞쪽에 절개 디자인이 들어가서 은은하게 돋보이는 것 같아요! </p>
                        </div>
                        <div className="like-tag-mes">
                            <ul>
                                <li><img src="/img/like.png" alt="like" /><p>20</p></li>
                                <li><img src="/img/tag.png" alt="tag" /><p>20</p></li>
                                <li><img src="/img/message.png" alt="message" /><p>20</p></li>
                            </ul>
                        </div>
                    </div>
                </div>


                {/* ASKICON */}
                {/* <div id="ask-icon">
                    <img src="/img/askicon.png" alt="ask-icon" />
                </div> */}
            </div>



        </>
    );
};




export default CommunityDetail;