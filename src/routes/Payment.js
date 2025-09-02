import { useMemo, useState } from "react";
import "../css/Payment.css"; // 페이지 공통 스타일이 있다면 임포트(없으면 제거)

export default function Payment() {
  // 폼 상태
  const [buyer, setBuyer] = useState("");
  const [receiver, setReceiver] = useState("");
  const [zip, setZip] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [payMethod, setPayMethod] = useState(""); // "kakao" | "naver" | ...

  // 데모용 금액(필요 시 props나 상태로 연결)
  
  const lineItems = [
    { name: "감성 목마 원목 말 흔들목마 우드 오브제", price: 95000, qty: 1 },
  ];

  const shipFee = 2000;
  const coupon = 0;

  const subtotal = useMemo(
    () => lineItems.reduce((s, it) => s + it.price * it.qty, 0),
    [lineItems]
  );
  const total = subtotal + shipFee - coupon;

  const fmt = (n) => n.toLocaleString("ko-KR") + "원";

  const onSubmit = (e) => {
    e.preventDefault();
    // 간단 유효성 체크
    if (!buyer || !receiver || !zip || !addr1 || !phone2 || !phone3 || !payMethod) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    const payload = {
      buyer,
      receiver,
      address: { zip, addr1, addr2 },
      phone: `${phone1}-${phone2}-${phone3}`,
      deliveryNote,
      payMethod,
      lineItems,
      subtotal,
      shipFee,
      coupon,
      total,
    };
    console.log("결제 요청 데이터:", payload);
    alert("결제 요청이 준비되었습니다. (콘솔 확인)");
  };

  return (
    <form onSubmit={onSubmit}>
      {/* 진행바 */}
      <div id="payment-progress">
        <ul>
          <li className="progress1">
            <div className="circle">
              <p>01</p>
            </div>
            <p className="progress-nav">
              SHOPPING <br />
              BAG
            </p>
          </li>
          <li><p className="ntt">&gt;</p></li>
          <li className="progress2">
            <div className="circle2">
              <p>02</p>
            </div>
            <p className="progress-nav2">ORDER</p>
          </li>
          <li><p className="ntt">&gt;</p></li>
          <li className="progress3">
            <div className="circle">
              <p>03</p>
            </div>
            <p className="progress-nav">
              ORDER <br />
              CONFIRMED
            </p>
          </li>
        </ul>
      </div>

      <div id="payment-main">
        {/* 배송정보 */}
        <div id="payment-text">
          <div className="section-title">
            <p>배송정보</p>
          </div>

          <ul>
            <li>
              <label htmlFor="buyer">주문인</label>
              <input
                id="buyer"
                type="text"
                placeholder="주문인 성함을 입력하세요."
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="receiver">수령인</label>
              <input
                id="receiver"
                type="text"
                placeholder="수령인 성함을 입력하세요."
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </li>

            <li className="address">
              <div className="address-top">
                <label htmlFor="zip">배송지</label>
                <div className="address-line">
                  <input
                    id="zip"
                    type="text"
                    className="address-box"
                    placeholder="우편번호 를 검색하세요."
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // TODO: 다음(카카오) 우편번호 API 연동
                      alert("우편번호 검색 모듈을 연결하세요.");
                    }}
                  >
                    우편번호 검색
                  </button>
                </div>
              </div>

              <div className="address-sub">
                <input
                  type="text"
                  placeholder="주소"
                  value={addr1}
                  onChange={(e) => setAddr1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="상세주소"
                  value={addr2}
                  onChange={(e) => setAddr2(e.target.value)}
                />
              </div>
            </li>

            <li className="phone">
              <label>연락처</label>
              <input
                type="text"
                maxLength={3}
                placeholder="010"
                className="phone-part"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value.replace(/\D/g, ""))}
              />
              <input
                type="text"
                maxLength={4}
                placeholder="1234"
                className="phone-part"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value.replace(/\D/g, ""))}
              />
              <input
                type="text"
                maxLength={4}
                placeholder="5678"
                className="phone-part"
                value={phone3}
                onChange={(e) => setPhone3(e.target.value.replace(/\D/g, ""))}
              />
            </li>

            <li id="delivery">
              <p>배송 요청 사항</p>
              <div className="custom-select">
                <select
                  aria-label="배송 요청 사항"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                >
                  <option value="">메시지 선택하세요</option>
                  <option value="door">문 앞</option>
                  <option value="security">경비실에 놔주세요.</option>
                  <option value="call">부재시 전화주세요.</option>
                  <option value="pickup">직접수령</option>
                </select>
              </div>
            </li>

            {/* 결제 수단 */}
            <div id="pay">
              <div className="pay-title">
                <p>결제 수단</p>
              </div>

              <ul>
                <li>
                  <button
                    type="button"
                    className={`btn1 ${payMethod === "kakao" ? "is-active" : ""}`}
                    onClick={() => setPayMethod("kakao")}
                  >
                    <img
                      src="https://00anuyh.github.io/SouvenirImg/kakaopay.png"
                      alt="kakao"
                    />
                    <p>카카오페이</p>
                  </button>

                  <button
                    type="button"
                    className={`btn2 ${payMethod === "naver" ? "is-active" : ""}`}
                    onClick={() => setPayMethod("naver")}
                  >
                    <img
                      src="https://00anuyh.github.io/SouvenirImg/badge_npay%201.png"
                      alt="naver"
                    />
                    <p>네이버페이</p>
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className={`btn3 ${payMethod === "samsung" ? "is-active" : ""}`}
                    onClick={() => setPayMethod("samsung")}
                  >
                    <img
                      src="https://00anuyh.github.io/SouvenirImg/samsungpay.jpg"
                      alt="samsung"
                    />
                    <p>삼성페이</p>
                  </button>

                  <button
                    type="button"
                    className={`btn4 ${payMethod === "card" ? "is-active" : ""}`}
                    onClick={() => setPayMethod("card")}
                  >
                    <img
                      src="https://00anuyh.github.io/SouvenirImg/card.png"
                      alt="card"
                    />
                    <p>카드결제</p>
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className={`btn5 ${payMethod === "bank" ? "is-active" : ""}`}
                    onClick={() => setPayMethod("bank")}
                  >
                    <img
                      src="https://00anuyh.github.io/SouvenirImg/dollar.png"
                      alt="bank"
                    />
                    <p>무통장입금</p>
                  </button>

                  <button
                    type="button"
                    className={`btn6 ${payMethod === "mobile" ? "is-active" : ""}`}
                    onClick={() => setPayMethod("mobile")}
                  >
                    <img
                      src="https://00anuyh.github.io/SouvenirImg/smartphone.png"
                      alt="mobile"
                    />
                    <p>휴대폰결제</p>
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </div>

        {/* 결제정보 요약 */}
        <div id="payment-right">
          <div id="payment-wrap">
            <p>결제금액</p>
            <div className="title-underline"></div>

            <ul id="price-prog">
              <li>
                <div id="payment1">
                  <p>상품명</p>
                  <p>{lineItems.map((it) => it.name).join(", ")}</p>
                </div>
              </li>

              <li>
                <div id="payment2">
                  <p>총 상품 금액</p>
                  <p>{fmt(subtotal)}</p>
                </div>
              </li>

              <li>
                <div id="payment3">
                  <p>배송비</p>
                  <p>{fmt(shipFee)}</p>
                </div>
              </li>

              <li>
                <div id="payment4">
                  <p>쿠폰 할인 금액</p>
                  <p>{fmt(coupon)}</p>
                </div>
              </li>

              <div className="title-underline"></div>

              <li>
                <div id="payment5">
                  <p>총 결제 금액</p>
                  <p>{fmt(total)}</p>
                </div>
              </li>
            </ul>

            <div id="payment-notice">
              <span>유의사항</span>
              <p>
                본인은 만 14세 이상이며, 주문내용을 확인하였습니다.<br />
                (주)버킷플레이스는 통신판매중개자로 거래 당사자가 아니므로,
                판매자가 등록한 상품정보및거래 등에대해 책임을지지 않습니다.<br />
              </p>
              <br />
              <p>
                (단. ㈜버킷플레이스가 판매자로 등록 판매한 상품은 판매자로서 책임을 부담합니다).
              </p>
            </div>

            <button type="submit"><p>결제하기</p></button>

            {/* <div className="ask">
              <img
                src="https://00anuyh.github.io/SouvenirImg/askicon.png"
                alt="ask"
              />
            </div> */}
          </div>
        </div>
      </div>
    </form>
  );
}
