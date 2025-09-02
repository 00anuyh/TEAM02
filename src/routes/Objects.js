import "../css/Objects.css"

import React, { useEffect, useRef, useState, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Objects() {
  const heroRef = useRef(null);
  const [active, setActive] = useState(0);

  const images = Array.from({ length: 4 }, (_, i) => `https://00anuyh.github.io/SouvenirImg/O_ban1img${i + 1}.png`);

  const heroMap = [0, 1, 2, 3];
  const triggersConf = Array.from({ length: 4 }, (_, i) => {
    const num = Math.floor(i / 2) + 1;
    const cls = i % 2 === 0 ? `decor decor-${num}` : `square square-${num}`;
    return {
      cls,
      src: `https://00anuyh.github.io/SouvenirImg/O_ban2img${i + 1}.png`,
      hero: heroMap[i],
    };
  });

  useEffect(() => {
    const scope = heroRef.current;
    if (!scope) return;

    let order = Array.from(scope.querySelectorAll(".decor, .square"));

    const BASE_RIGHT = 800;
    const CC_GAP = 60;

    const applyPositions = () => {
      const widths = order.map((el) => el.getBoundingClientRect().width);
      let r = BASE_RIGHT;

      order.forEach((el, i) => {
        if (i !== 0) {
          r += (widths[i - 1] / 2) + (widths[i] / 2) + CC_GAP;
        }
        el.style.position = "absolute";
        el.style.top = "50%";
        el.style.left = `${r}px`;
      });
    };

    applyPositions();

    const onClick = (e) => {
      const btn = e.target.closest(".decor, .square");
      if (!btn || !scope.contains(btn)) return;
      e.preventDefault();

      const to = Number(btn.dataset.hero);
      setActive(
        Number.isNaN(to)
          ? (prev) => (prev + 1) % images.length
          : ((to % images.length) + images.length) % images.length
      );

      order = Array.from(scope.querySelectorAll(".decor, .square"))
        .sort((a, b) => Number(a.dataset.order ?? 0) - Number(b.dataset.order ?? 0));

      const idx = order.indexOf(btn);
      if (idx === -1) return;

      order = order.slice(idx).concat(order.slice(0, idx));
      applyPositions();
    };

    const onResize = () => {
      order = Array.from(scope.querySelectorAll(".decor, .square"))
        .sort((a, b) => Number(a.dataset.order ?? 0) - Number(b.dataset.order ?? 0));
      applyPositions();
    };

    scope.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      scope.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [images.length]);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="container hero-grid">
          <figure className="hero-main">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`hero ${i + 1}`}
                className={i === active ? "is-active" : ""}
              />
            ))}
          </figure>

          {triggersConf.map((t, i) => (
            <div key={i} className={t.cls} data-hero={t.hero}>
              <img src={t.src} alt="" />
            </div>
          ))}
        </div>
      </section>
      <ProductList />
    </>
  );
}

function ProductList() {
  // 디테일 페이지가 준비된 상품 id(슬러그) 예시
  const DETAIL_SLUGS = ["ovject-item-001", "ovject-item-002"];

  const items = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const slug = DETAIL_SLUGS[i % DETAIL_SLUGS.length]; // 데모: 두 상품 id를 반복 사용
        return {
          id: i + 1,                     // 리스트 키용 숫자 id
          slug,                          // 디테일 라우팅용 id
          name: i % 2 ? "앰버 램프" : "우드 토이",
          price: i % 2 ? "₩49,000" : "₩29,000",
          src: `https://00anuyh.github.io/SouvenirImg/O_sec1img${(i % 9) + 1}.png`,
          soldout: i === 3 || i === 8 || i === 18 || i === 36,
        };
      }),
    []
  );

  const STEP = 8;
  const [showing, setShowing] = useState(STEP);
  const [likes, setLikes] = useState(() => new Set());

  const toggleLike = (id) =>
    setLikes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const HEART = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.1 21s-6.4-4.2-9-6.8A5.8 5.8 0 0 1 12 6a5.8 5.8 0 0 1 8.9 8.3c-2.6 2.7-8.8 6.7-8.8 6.7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const BAG = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 8h12l-1.2 12H7.2L6 8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );

  const visible = items.slice(0, showing);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">OBJECTS</h2>
        <div className="section-line"></div>

        <ul className="product-grid">
          {visible.map((p) => (
            <li className="product-card" key={p.id}>
              {/* 링크는 li 내부로, 라우트 파라미터로 슬러그 전달 */}
              <Link to={`/detail/${p.slug}`} className="product-media">
                <img src={p.src} alt={p.name} />
                {p.soldout && <span className="badge soldout" aria-hidden="true" />}
                <span className="meta name">{p.name}</span>
                <span className="meta price">{p.price}</span>
              </Link>

              {/* 찜 */}
              <button
                className="icon-btn like"
                type="button"
                aria-pressed={likes.has(p.id) ? "true" : "false"}
                aria-label="찜하기"
                title="찜하기"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // 링크 클릭 방지
                  toggleLike(p.id);
                }}
              >
                {HEART}
              </button>

              {/* 장바구니 */}
              <button
                className="icon-btn cart"
                type="button"
                aria-label="장바구니 담기"
                title="장바구니 담기"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // 링크 클릭 방지
                  console.log("장바구니 담기!", p.id, p.slug);
                }}
              >
                {BAG}
              </button>
            </li>
          ))}
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
    </section>
  );
}
