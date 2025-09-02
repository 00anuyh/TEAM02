import styled from "styled-components";
import "../css/Objects.css"; // 카드 스타일 재사용
import React from "react";
import { Link } from "react-router-dom";
import { useFavs } from "../context/FavContext";

const likeBox = styled.div`

.toptitle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
}

.toptitle .titleleft {
  width: 40%;
  height: 2px;
  background-color: #5E472F;
}

.toptitle h2 {
  font-size: 1.8rem;
  letter-spacing: 1px;
  font-weight: 500;
  font-family: "Playfair Display", serif;
}

.toptitle .titleright {
  width: 40%;
  height: 2px;
  background-color: #5E472F;
}

#fav-wrap {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
}

.fav-title {

    margin: 0 auto;
    margin-top: 50px;
    width: 1440px;
    text-align: center;
    font-family: "Playfair Display", serif;
    font-size: 1.7rem;
}

.fav-line {
    width: 1440px;
    height: 1px;
    background-color: #5e472f;
    margin: 0 auto;
}

.fav-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;

}

.fav-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0 100px 50px;
    margin-top: 50px;
    padding: 0 100px;
}

.fav-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: relative;
}

.fav-box img {
    top: 0;
    left: 0;
    display: block;
    width: 90%;
}

.fav-box:hover img {
    filter: brightness(50%);
    z-index: 2;
}


.fav-box p {
    display: none;
    position: absolute;
    top: 10px;
    left: 30px;
    z-index: 3;
    color: #fff;
    line-height: 32px;
}

.fav-box:hover p {
    display: block;
}


.fav-box i {
    position: absolute;
    color: #fff;
    display: none;
    bottom: 20px;
    right: 40px;
    z-index: 5;
    font-size: 1.2rem;
}

.fav-box:hover i {
    display: block;
}
`;

const Favorites = () => {
    const { favs, removeFav, toggleFav, hasFav } = useFavs();
    return (
        <likeBox>
            <div className="fav-wrap">
                <div className="fav-container">
                    <div className="toptitle">
                        <div className="titleleft" />
                        <h2>Favorites</h2>
                        <div className="titleright" />
                    </div>
                    <div className="fav-line"></div>

                    {favs.length === 0 ? (
                        <p style={{ padding: "24px 0" }}>
                            즐겨찾기한 상품이 없어요. 카테고리에서 ♥ 를 눌러 추가해보세요.
                        </p>
                    ) : (
                        <ul className="product-grid">
                            {favs.map((p) => (
                                <li className="product-card" key={p.id}>
                                    <Link to={`/detail/${p.slug}`} className="product-media">
                                        <img src={p.src} alt={p.name} />
                                        <span className="meta name">{p.name}</span>
                                        <span className="meta price">{p.price}</span>
                                    </Link>

                                    <button
                                        className="icon-btn like"
                                        type="button"
                                        aria-pressed={hasFav(p.id) ? "true" : "false"}
                                        aria-label="즐겨찾기 제거"
                                        title="즐겨찾기 제거"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleFav(p);
                                        }}
                                    >
                                        {/* 같은 하트 아이콘을 재사용하거나, 채운 하트로 바꿔도 됨 */}
                                        {/* <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path
                                                d="M12.1 21s-6.4-4.2-9-6.8A5.8 5.8 0 0 1 12 6a5.8 5.8 0 0 1 8.9 8.3c-2.6 2.7-8.8 6.7-8.8 6.7z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg> */}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </likeBox>
    )
}


export default Favorites;