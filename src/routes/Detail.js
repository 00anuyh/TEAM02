// src/routes/Detail.js
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import "../css/Detail.css";

import { IoSearch, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import catalog from "../data/detailData.json";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";

export default function Detail() {
  // ---------- Refs ----------
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const gridRef = useRef(null);
  const rightRef = useRef(null);
  const buybarRef = useRef(null);

  const imgRef = useRef(null);
  const parcelRef = useRef(null);
  const refundRef = useRef(null);
  const sellerRef = useRef(null);
  const reviewRef = useRef(null);
  const rvModalRef = useRef(null);

  // ---------- State ----------
  const [navOpen, setNavOpen] = useState(false);
  const [optOpen, setOptOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState({
    open: false,
    name: "",
    stars: "",
    score: "",
    text: "",
    thumb: "",
  });

  // ---------- Router ----------
  const { slug, id } = useParams();
  const key = slug ?? id ?? null;
  const location = useLocation();
  const navigate = useNavigate();
  const alertedRef = useRef(false);

  // ---------- Helpers ----------
  // 절대 URL은 그대로, 상대 경로만 환경에 맞게 prefix
  const img = useCallback((p) => {
    if (!p) return "";
    if (/^https?:\/\//i.test(p)) return p;
    return process.env.NODE_ENV === "production"
      ? `https://00anuyh.github.io/SouvenirImg${p}`
      : `${process.env.PUBLIC_URL}${p}`;
  }, []);

  // ✅ slug 또는 id로 catalog에서 상품 찾기 (배열/객체/객체.items 모두 지원)
  const active = useMemo(() => {
    // 1) 네비게이션 state 우선
    const fromState = location.state?.product || location.state;
    if (fromState?.id || fromState?.slug || fromState?.product?.slug) {
      return fromState;
    }

    // 2) catalog 정규화
    const list = Array.isArray(catalog)
      ? catalog
      : (catalog?.items
          ? catalog.items
          : (catalog && typeof catalog === "object"
              ? Object.values(catalog)
              : []));

    // 3) key(slug 또는 id)로 매칭
    const k = key ? String(key) : null;
    const found = list.find((item) => {
      const iid = String(item.id ?? item.product?.id ?? "");
      const islug = String(item.slug ?? item.product?.slug ?? "");
      return (k && (islug === k || iid === k));
    });

    return found || null;
  }, [key, location.state]);

  const gallery = useMemo(() => (active?.gallery ?? []).map(img), [active, img]);
  const tabLabels = useMemo(
    () => active?.tabs ?? ["상품이미지", "배송안내", "교환/환불안내", "판매자정보", "리뷰"],
    [active]
  );
  const targets = useMemo(() => [imgRef, parcelRef, refundRef, sellerRef, reviewRef], []);

  // ---------- Effects ----------
  // 사이드 내비 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const scrollToTarget = useCallback(
    (idx) => {
      const headerH = headerRef.current?.offsetHeight || 0;
      const t = targets[idx]?.current;
      if (!t) return;
      const top = t.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [targets]
  );

  const openReviewModal = useCallback((itemEl) => {
    if (!itemEl) return;
    const name = itemEl.querySelector(".rv-name")?.textContent?.trim() || "";
    const stars = itemEl.querySelector(".rv-stars-static")?.textContent?.trim() || "";
    const score = itemEl.querySelector(".rv-score")?.textContent?.trim() || "";
    const thumb = itemEl.querySelector(".rv-thumb")?.getAttribute("src") || "";
    const copy = itemEl.querySelector(".rv-excerpt")?.cloneNode(true);
    copy?.querySelector(".rv-more")?.remove();
    const text = copy?.textContent?.trim() || "";
    setReviewModal({ open: true, name, stars, score, text, thumb });
  }, []);

  // 구매바/푸터 보정
  const recalcBuybar = useCallback(() => {
    const buy = buybarRef.current;
    if (!buy) return;

    const h = buy.offsetHeight || 64;
    document.documentElement.style.setProperty("--buybar-h", `${h}px`);

    const footer = document.querySelector("footer");
    if (footer) {
      const st = window.pageYOffset || document.documentElement.scrollTop || 0;
      const vh = window.innerHeight || 0;
      const ft = footer.getBoundingClientRect().top + window.pageYOffset;
      const overlap = Math.max(0, st + vh - ft);
      buy.style.transform = `translate3d(0, ${-overlap}px, 0)`;
    } else {
      buy.style.transform = "translate3d(0,0,0)";
    }
  }, []);

  useEffect(() => {
    recalcBuybar();
    const onScrollResize = () => requestAnimationFrame(recalcBuybar);
    window.addEventListener("scroll", onScrollResize);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [recalcBuybar]);

  useLayoutEffect(() => {
    const r1 = requestAnimationFrame(recalcBuybar);
    const r2 = requestAnimationFrame(recalcBuybar);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [optOpen, recalcBuybar]);

  useEffect(() => {
    if (!buybarRef.current) return;
    const ro = new ResizeObserver(() => recalcBuybar());
    ro.observe(buybarRef.current);
    return () => ro.disconnect();
  }, [recalcBuybar]);

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        setReviewModal((prev) => ({ ...prev, open: false }));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // 오른쪽 패널 멈춤 보정
  const clampAside = useCallback(() => {
    const aside = rightRef.current;
    const seller = sellerRef.current;
    if (!aside || !seller) return;

    const topStr = window.getComputedStyle(aside).top;
    let topOffset = parseFloat(topStr) || 0;
    if (/%$/.test(topStr)) {
      topOffset = (parseFloat(topStr) / 100) * window.innerHeight;
    }

    const asideH = aside.offsetHeight || 0;
    const sellerBottom = seller.getBoundingClientRect().bottom + window.pageYOffset;

    const st = window.pageYOffset || 0;
    const desiredTop = st + topOffset;
    const overflow = Math.max(0, desiredTop + asideH - sellerBottom);

    aside.style.transform = `translateY(${-overflow}px)`;
  }, []);

  useEffect(() => {
    clampAside();
    const onScrollResize = () => requestAnimationFrame(clampAside);
    window.addEventListener("scroll", onScrollResize);
    window.addEventListener("resize", onScrollResize);

    const imgs = Array.from(document.querySelectorAll(".detail-left img"));
    const onImgLoad = () => clampAside();
    imgs.forEach((imgEl) => {
      if (imgEl.complete) return;
      imgEl.addEventListener("load", onImgLoad, { once: true });
    });

    return () => {
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      imgs.forEach((imgEl) => imgEl.removeEventListener?.("load", onImgLoad));
    };
  }, [clampAside]);

  // ---------- active 없을 때: 알럿 + 이동 ----------
  useEffect(() => {
    if (!active && !alertedRef.current) {
      alertedRef.current = true;
      alert("등록된 페이지가 없습니다.");
      navigate(-1);
    }
  }, [active, navigate]);

  // 이동 직전엔 렌더 막기 (Hook 순서는 이미 보장됨)
  if (!active) return null;

  // product가 중첩/루트 어느 쪽이든 안전하게 접근
  const product = active.product ?? active;

  // ---------- Render ----------
  return (
    <div className="detail-warp1">
      <header id="detail-header" ref={headerRef}>
        <div id="header-left">
          <button
            id="hamburger"
            type="button"
            aria-expanded={navOpen}
            aria-label={navOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setNavOpen((v) => !v)}
          >
            {navOpen ? <IoMdClose size={22} /> : <GiHamburgerMenu size={22} />}
          </button>

          <div id="detail-tap" className="detail-tabs">
            {tabLabels.map((t, idx) => (
              <button type="button" key={t} onClick={() => scrollToTarget(idx)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          id="detail-logo"
        >
          <img src="/img/logo.png" alt="logo" />
        </NavLink>
        <div id="header-right">
          <a href="#none" aria-label="검색">
            <IoSearch size={22} />
          </a>
          <a href="#none" aria-label="계정">
            <HiOutlineUser size={22} />
          </a>
          <a href="#none" aria-label="찜">
            <IoHeartOutline size={22} />
          </a>
          <a href="#none" aria-label="장바구니">
            <IoCartOutline size={22} />
          </a>
        </div>
      </header>

      {/* SIDE NAV */}
      <nav id="detail-nav" className={navOpen ? "open" : ""} ref={navRef}>
        <ul id="detail-menu1">
          <li className="hamprofile">
            <p>
              <span>임재형</span> 님
            </p>
            <p>
              Lv.2<span> 루키</span>
            </p>
            <p>
              사용 가능 쿠폰 : <span>3장</span>
            </p>
          </li>
          <li>
            <NavLink
              to="/lifestyle"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              LIFESTYLE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lighting"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              LIGHTING
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Objects"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              OBJECTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Community"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              COMMUNITY
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* MAIN */}
      <main id="detailPage">
        <div className="detail-grid" ref={gridRef}>
          {/* 왼쪽 */}
          <section className="detail-left">
            <div className="detail-img" ref={imgRef}>
              {gallery.map((src, i) => (
                <img key={i} src={src} alt={`detail-${i + 1}`} />
              ))}
            </div>

            <div className="detail-inpo detail-parcel" ref={parcelRef}>
              <h3 className="detail-info-title">배송</h3>
              <table className="detail-info-table">
                <tbody>
                  {(active.shipping || []).map(([th, td]) => (
                    <tr key={th}>
                      <th>{th}</th>
                      <td>{td}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="detail-inpo detail-refund" ref={refundRef}>
              <h3 className="detail-info-title">교환/환불</h3>
              <table className="detail-info-table">
                <tbody>
                  {(active.refund || []).map(([th, td]) => (
                    <tr key={th}>
                      <th>{th}</th>
                      <td>{td}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 className="detail-info-subtitle">반품/교환 사유에 따른 요청 가능 기간</h4>
              <ol className="detail-info-list">
                {(active.refundGuides?.period || []).map((li, idx) => (
                  <li key={idx}>{li}</li>
                ))}
              </ol>

              <h4 className="detail-info-subtitle">반품/교환 불가 사유</h4>
              <ol className="detail-info-list">
                {(active.refundGuides?.notAllowed || []).map((li, idx) => (
                  <li key={idx}>{li}</li>
                ))}
              </ol>
            </div>

            <div className="detail-inpo seller" ref={sellerRef}>
              <h3 className="detail-info-title">판매자 정보</h3>
              <table className="detail-info-table">
                <tbody>
                  {(active.seller || []).map(([th, td]) => (
                    <tr key={th}>
                      <th>{th}</th>
                      <td>{td}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="detail-inpo detail-review" id="review" ref={reviewRef}>
              <h3 className="detail-info-title">리뷰</h3>

              <form className="rv-form" onSubmit={(e) => e.preventDefault()}>
                <div className="rv-top">
                  <div className="rv-avatar lg" aria-hidden="true" />
                  <div className="rv-meta">
                    <p className="rv-nick">
                      <b>임재형 님</b>
                    </p>
                    <div className="rv-stars" data-score="0" aria-label="별점 선택">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button type="button" key={v} className="star" aria-label={`${v}점`}>
                          ☆
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="rv-photo-btn">
                    <input type="file" accept="image/*" hidden />
                    <span>사진첨부하기</span>
                  </label>
                </div>
                <textarea className="rv-text" placeholder="솔직한 후기를 작성해주세요. (최소 10자)" />
                <button className="rv-submit" type="submit">
                  등록하기
                </button>
              </form>

              <div className="rv-filter">
                <button className="detail-on" type="button">
                  최신순
                </button>
                <button type="button">평점 높은순</button>
                <button type="button">평점 낮은순</button>
                <button type="button">사진 리뷰만 보기</button>
              </div>

              <ul className="rv-list">
                {(active.reviews || []).map((rv, idx) => (
                  <li className="rv-item" key={idx}>
                    <div className="rv-head">
                      <div className="rv-avatar" aria-hidden="true" />
                      <div>
                        <p className="rv-name">{rv.name}</p>
                        <p className="rv-starline">
                          <span className="rv-stars-static">{rv.stars}</span>
                          <span className="rv-score">{rv.score}</span>
                        </p>
                      </div>
                    </div>
                    <div className="rv-body">
                      <img
                        className="rv-thumb"
                        src={img(rv.thumb)}
                        alt="리뷰 사진"
                        onClick={(e) => openReviewModal(e.currentTarget.closest(".rv-item"))}
                      />
                      <p className="rv-excerpt">
                        {rv.excerpt}
                        <a
                          href="#none"
                          className="rv-more"
                          onClick={(e) => {
                            e.preventDefault();
                            openReviewModal(e.currentTarget.closest(".rv-item"));
                          }}
                        >
                          [더보기]
                        </a>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 오른쪽 패널 */}
          <aside className="detail-right" ref={rightRef}>
            <div className="detail-text">
              <div className="detail-brand">{product.brand}</div>
              <h1 className="detail-name">{product.name}</h1>
              <div className="detail-price">{product.price}</div>
              <p className="detail-desc">{product.desc}</p>
              <h4 className="detail-subhead">Details</h4>
              <ul className="detail-list">
                {(product.details || []).map((d) => (
                  <li key={d.label}>
                    <strong>{d.label}</strong>: {d.value}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* 구매바 */}
        <div id="detail-buybar" className="detail-buybar" ref={buybarRef}>
          <div className="detail-buybar-box">
            <div className="db-left">
              <p className="detail-buybar-title">{product.name}</p>
              <p className="detail-buybar-price">{product.price}</p>
              <div className="detail-option" style={{ display: optOpen ? "block" : "none" }}>
                <div className="detail-label-box">
                  <label className="detail-label">옵션</label>
                  <select id="detail-opt" defaultValue="기본 구성">
                    <option>기본 구성</option>
                    <option>레이스 리본 포함(+₩3,000)</option>
                  </select>
                </div>
                <div className="detail-actions">
                  <button className="detail-cartBtn" type="button">
                    CART
                  </button>
                  <button className="detail-buyBtn" type="button">
                    BUY
                  </button>
                </div>
              </div>
            </div>

            <div className="detail-buybar-right">
              <button
                className="detail-buybar-actions"
                type="button"
                aria-expanded={optOpen}
                onClick={() => {
                  setOptOpen((v) => !v);
                  requestAnimationFrame(recalcBuybar);
                }}
              >
                <span className="caret">{optOpen ? "OPTION ▼" : "OPTION ▲"}</span>
              </button>

              <div className="detail-option" style={{ display: optOpen ? "block" : "none" }}>
                <div className="detail-qty">
                  <button className="qty-btn" type="button">
                    -
                  </button>
                <input className="qty-input" type="text" defaultValue="1" />
                  <button className="qty-btn" type="button">
                    +
                  </button>
                </div>
                <p className="detail-total">총합 {product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 리뷰 모달 */}
      <aside
        id="rv-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rvm-title"
        ref={rvModalRef}
        style={{ display: reviewModal.open ? "block" : "none" }}
      >
        <button
          type="button"
          className="rvm-close"
          aria-label="닫기"
          onClick={() => setReviewModal((p) => ({ ...p, open: false }))}
        >
          ×
        </button>
        <div className="rvm-hero-wrap">
          {reviewModal.thumb ? (
            <img className="rvm-hero" src={reviewModal.thumb} alt="리뷰 이미지" />
          ) : null}
        </div>
        <div className="rvm-head">
          <div className="rvm-avatar" aria-hidden="true" />
          <div className="rvm-meta">
            <h4 id="rvm-title" className="rvm-name">
              {reviewModal.name}
            </h4>
            <p className="rvm-starline">
              <span className="rvm-stars">
                {reviewModal.stars} {reviewModal.score}
              </span>
            </p>
          </div>
        </div>
        <div className="rvm-body">
          <p className="rvm-text">{reviewModal.text}</p>
        </div>
      </aside>

      {navOpen && <div className="nav-backdrop" aria-hidden="true" onClick={() => setNavOpen(false)} />}
    </div>
  );
}
