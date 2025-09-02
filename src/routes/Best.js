import React, { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../css/Best.css";

import { IoIosArrowDown } from "react-icons/io";
import { IoHeartOutline, IoHeart, IoCartOutline } from "react-icons/io5";

// ✅ detailData.json 직접 사용
import products from "../data/detailData.json";

export default function Best() {
  const STEP = 12;

  const [likes, setLikes] = useState(new Set());
  const [showing, setShowing] = useState(STEP);

  const slides = [1, 2, 3, 4, 5];

  const resolveImg = (src) => {
    if (!src) return "/img/placeholder.png";
    if (/^https?:\/\//i.test(src)) return src;
    return src.startsWith("/")
      ? src
      : `${process.env.PUBLIC_URL}/${src.replace(/^\.?\//, "")}`;
  };

  // detailData.json → 베스트 카드에 필요한 형태로 매핑
  const items = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return list.map((it, idx) => ({
      id: it.id ?? String(idx + 1),
      slug: it.id ?? String(idx + 1), // /detail/:slug 에서 사용
      name: it.product?.name ?? "",
      price: it.product?.price ?? "", // 문자열이면 그대로 노출
      image: resolveImg(it.gallery?.[0]),
      soldout: !!it.soldout, // 필드 없으면 false
    }));
  }, []);

  const visible = useMemo(() => items.slice(0, showing), [items, showing]);

  const toggleLike = useCallback((id) => {
    setLikes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const HEART = (on) => (on ? <IoHeart /> : <IoHeartOutline />);
  const BAG = <IoCartOutline />;

  const formatPrice = (price, currency = "KRW") =>
    typeof price === "string"
      ? price
      : new Intl.NumberFormat("ko-KR", { style: "currency", currency }).format(
          price ?? 0
        );

  return (
    <>

      <div className="bestBanner">
        <Swiper
          className="mySwiper"
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          speed={700}
        >
          {slides.map((n) => (
            <SwiperSlide key={n}>
              <div className={`slide-bg bstimg${n}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="toptitle">
        <div className="titleleft" />
        <h2>Best</h2>
        <div className="titleright" />
      </div>

      <div className="bestList">
        <ul className="product-grid">
          {visible.map((p, i) => {
            const liked = likes.has(p.id);
            const soldout = p.soldout;
            const rank = i + 1; // 1부터 표시

            return (
              <li className="product-card" key={p.id}>
                {/* 순위 배지(선택) */}
                <span className="rank-badge" aria-hidden="true">
                  {rank}
                </span>

                <Link to={`/detail/${p.slug}`} className="product-media">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  {soldout && <span className="badge soldout" aria-hidden="true" />}
                  <span className="meta name">{p.name}</span>
                  <span className="meta price">{formatPrice(p.price)}</span>
                </Link>

                {/* 찜 */}
                <button
                  className="icon-btn like"
                  type="button"
                  aria-pressed={liked ? "true" : "false"}
                  aria-label="찜하기"
                  title="찜하기"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike(p.id);
                  }}
                >
                  {HEART(liked)}
                </button>

                {/* 장바구니 */}
                <button
                  className="icon-btn cart"
                  type="button"
                  aria-label="장바구니 담기"
                  title="장바구니 담기"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("장바구니 담기!", p.id, p.slug);
                  }}
                >
                  {BAG}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="more">
          {showing < items.length && (
            <button
              className="btn-more"
              type="button"
              onClick={() => setShowing((s) => Math.min(s + STEP, items.length))}
            >
              more <IoIosArrowDown className="IoIosArrowDown" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
