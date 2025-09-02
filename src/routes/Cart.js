import React, { useState, useMemo } from "react";
import "../css/Cart.css";
import cartData from "../data/CartData.json";

export default function Cart() {
  const [items, setItems] = useState(cartData);

  const allChecked = items.every((it) => it.checked);
  const toggleAll = () =>
    setItems((prev) => prev.map((it) => ({ ...it, checked: !allChecked })));

  const toggleOne = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );

  const plus = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );

  const minus = (id) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );

  const removeSelected = () =>
    setItems((prev) => prev.filter((it) => !it.checked));

  const fmt = (n) => n.toLocaleString("ko-KR") + "원";

  const { subtotal, delivery, total, count } = useMemo(() => {
    const selected = items.filter((it) => it.checked);
    const subtotal = selected.reduce((s, it) => s + it.unitPrice * it.qty, 0);
    const delivery = selected.reduce((s, it) => s + (it.delivery || 0), 0);
    const total = subtotal + delivery;
    const count = selected.reduce((s, it) => s + it.qty, 0);
    return { subtotal, delivery, total, count };
  }, [items]);

  return (
    <div className="cartwarp1">
      {/* 결제 단계 표시 */}
      <div id="payment-progress">
        <ul>
          <li className="progress1">
            <div className="circle2"><p>01</p></div>
            <p className="progress-nav">SHOPPING <br/> BAG</p>
          </li>
          <li><p className="ntt">&gt;</p></li>
          <li className="progress2">
            <div className="circle"><p>02</p></div>
            <p className="progress-nav2">ORDER</p>
          </li>
          <li><p className="ntt">&gt;</p></li>
          <li className="progress3">
            <div className="circle"><p>03</p></div>
            <p className="progress-nav">ORDER <br/> CONFIRMED</p>
          </li>
        </ul>
      </div>

      {/* 장바구니 */}
      <div id="cart-wrap">
        <div id="cart-title"><p>장바구니 정보</p></div>

        <div id="cart-item">
          <ul>
            <li><p>상품정보</p></li>
            <li><p>수량</p></li>
            <li><p>배송비</p></li>
            <li><p>주문금액</p></li>
          </ul>
        </div>

        <div id="cart-list">
          <ul>
            <li>
              {items.map((it) => (
                <div key={it.id} className={`cartitem${it.id}`}>
                  <input
                    type="checkbox"
                    checked={it.checked}
                    onChange={() => toggleOne(it.id)}
                    name="check"
                  />
                  <div className="cartitemimg">
                    <img src={it.image} alt={`cart${it.id}`} />
                  </div>

                  <div className="cartitem-text">
                    <span>{it.brand}</span>
                    <ul>
                      <li className="cart-item-title"><p>{it.title}</p></li>
                      <li className="cart-item-color"><p>[color] {it.color}</p></li>
                      <li className="cart-item-size"><p>[size] {it.size}</p></li>
                      <li className="cart-item-price">
                        <p>{fmt(it.unitPrice)} (수량 {it.qty}개)</p>
                      </li>
                      <li className="cart-item-serialnumber">
                        <p>주문번호 : {it.orderNo}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="cart-item-count">
                    <ul>
                      <li><button className="btn-" onClick={() => minus(it.id)}>-</button></li>
                      <li><p>{it.qty}</p></li>
                      <li><button onClick={() => plus(it.id)}>+</button></li>
                    </ul>
                  </div>

                  <div className="delivery-price">
                    <p>{it.delivery === 0 ? "무료배송" : fmt(it.delivery)}</p>
                  </div>
                  <div className="order-price">
                    <p>{fmt(it.unitPrice * it.qty)}</p>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </div>

        <div id="cart-footer">
          <ul>
            <li>
              <button onClick={toggleAll}>
                <p>✔</p><span>모든상품 선택</span>
              </button>
            </li>
            <li>
              <button onClick={removeSelected}>
                <img
                  src="https://00anuyh.github.io/SouvenirImg/delete.png"
                  alt="trash"
                />
                <span className="qwer">선택품목 삭제</span>
              </button>
            </li>
            <li>
              <p className="cart-notice">장바구니에는 최대 100개의 상품을 담을 수 있습니다.</p>
            </li>
          </ul>

          <div id="cart-total">
            <div className="cart-total-title">
              <ul>
                <li><p>총 주문금액</p></li>
                <li><p>배송비</p></li>
                <li><p>총 결제금액</p></li>
              </ul>
            </div>

            <div className="cart-total-payment">
              <ul>
                <li>
                  <p>{fmt(subtotal)}</p>
                  <p id="q1w2e3">총 {count}개</p>
                </li>
                <li><p>{fmt(delivery)}</p></li>
                <li><p>{fmt(total)}</p></li>
              </ul>
            </div>

            <div className="cart-total-final">
              <button className="cart-total-btn1"><p>쇼핑계속하기</p></button>
              <button className="cart-total-btn2"><p>결제하기</p></button>
            </div>
          </div>
        </div>

        {/* ASK ICON */}
        {/* <div id="ask-icon">
          <img
            src="https://00anuyh.github.io/SouvenirImg/askicon.png"
            alt="ask-icon"
          />
        </div> */}
      </div>
    </div>
  );
}
