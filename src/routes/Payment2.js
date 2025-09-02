import React, { useEffect, useState } from "react";
import "../css/Payment2.css"; // 기존 스타일 재사용 (다른 파일이면 교체)
import "../data/Payment.json"
import paymentData from "../data/Payment.json"; 


const CDN = "https://00anuyh.github.io/SouvenirImg";

export default function Payment2({
  // JSON의 값을 기본값으로 사용 (props로 덮어쓰기 가능)
  items = paymentData.items,
  receiver = paymentData.receiver,
  zip = paymentData.zip,
  address = paymentData.address,
  phone = paymentData.phone,
  request = paymentData.request,
  onKeepShopping = () => {},
  onOpenLetter = () => {},
}) {
  return (
    <div id="cart-wrap">
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
            <div className="circle">
              <p>02</p>
            </div>
            <p className="progress-nav2">ORDER</p>
          </li>
          <li><p className="ntt">&gt;</p></li>
          <li className="progress3">
            <div className="circle2">
              <p>03</p>
            </div>
            <p className="progress-nav">
              ORDER <br />
              CONFIRMED
            </p>
          </li>
        </ul>
      </div>

      {/* 주문완료 배너 */}
      <div id="payment-final">
        <div className="payment-final-text">
          <p>주문완료!</p>
          <p>구매가 정상적으로 완료되었습니다.</p>
        </div>
        <div className="payment-final-button">
          <ul>
            <li>
              <button className="payment-final-button1" type="button" onClick={onKeepShopping}>
                <p>쇼핑계속하기</p>
              </button>
            </li>
            <li>
              <button className="payment-final-button2" type="button" onClick={onOpenLetter}>
                <img src={`${CDN}/letter.png`} alt="letter" />
                <p>편지도착</p>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 주문상품 정보 타이틀 */}
      <div id="cart-title">
        <p>주문상품 정보</p>
      </div>

      {/* 테이블 헤더 */}
      <div id="cart-item">
        <ul>
          <li><p>상품정보</p></li>
          <li><p>배송비</p></li>
          <li><p>진행상태</p></li>
        </ul>
      </div>

      {/* 주문상품 리스트 */}
      <div id="cart-list">
        <ul>
          <li>
            {items.map((it) => (
              <div key={it.id} className={`cartitem${it.id}`}>
                <div className="cartitemimg">
                  <img src={it.image} alt={`cart${it.id}`} />
                </div>

                <div className="cartitem-text">
                  <span>{it.brand}</span>
                  <ul>
                    <li className="cart-item-title">
                      <p>{it.title}</p>
                    </li>
                    <li className="cart-item-color"><p>[color] {it.color}</p></li>
                    <li className="cart-item-size"><p>[size] {it.size}</p></li>
                    <li className="cart-item-price">
                      <p>
                        {it.unitPrice.toLocaleString("ko-KR")}원 (수량 {it.qty}개)
                      </p>
                    </li>
                    <li className="cart-item-serialnumber">
                      <p>주문번호 : {it.orderNo}</p>
                    </li>
                  </ul>
                </div>

                <div className="cart-item-count" />

                <div className="delivery-price">
                  <p>{it.deliveryCost ? `${it.deliveryCost.toLocaleString("ko-KR")}원` : "무료배송"}</p>
                </div>

                <div className="order-price">
                  <ul>
                    {it.status.map((s, idx) => (
                      <li key={idx}><p>{s}</p></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </li>
        </ul>
      </div>

      {/* 배송정보 요약 */}
      <div id="cart-footer">
        <div id="cart-total">
          <div className="cart-total-title">
            <ul>
              <li><p>배송정보</p></li>
            </ul>
          </div>

          <div className="cart-total-payment">
            <ul>
              <li><p>수령인</p></li>
              <li><p>배송지</p></li>
              <li><p>연락처</p></li>
              <li><p>배송시 요청사항</p></li>
            </ul>
          </div>

          <div className="cart-total-personal">
            <ul>
              <li><p>{receiver}</p></li>
              <li>
                <p>{zip}</p>
                <p>{address}</p>
              </li>
              <li><p>{phone}</p></li>
              <li><p>{request}</p></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ASK ICON */}
      {/* <div id="ask-icon">
        <img src={`${CDN}/askicon.png`} alt="ask-icon" />
      </div> */}
    </div>
  );
}
