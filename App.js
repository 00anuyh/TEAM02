import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";

import MainPage from './routes/MainPage';
import LifeStyle from './routes/LifeStyle';
import Lighting from './routes/Lighting';
import Objects from './routes/Objects';
import Community from './routes/Community';
import Community2 from './routes/Community2';
import Community3 from './routes/Community3';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import Payment from './routes/Payment';
import Payment2 from './routes/Payment2';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import Event from './routes/Event';
import Favorites from './routes/Favorites';
import Best from './routes/Best';


function WithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

// 레이아웃: 헤더 없음 (Detail 전용)
function WithoutHeader() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default function App() {

  return (
    <>
      <div className='Warp'>
        <Routes>
          {/* 헤더가 필요한 페이지들 */}
          <Route element={<WithHeader />}>
            <Route index element={<MainPage />} />
            <Route path="lifestyle" element={<LifeStyle />} />
            <Route path="lighting" element={<Lighting />} />
            <Route path="objects" element={<Objects />} />
            <Route path="community" element={<Community />} />
            <Route path="community2" element={<Community2 />} />
            <Route path="community3" element={<Community3 />} />
            <Route path="cart" element={<Cart />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="Payment2" element={<Payment2 />} />
            <Route path="Event" element={<Event />} />
            <Route path="MyPage" element={<MyPage />} />
            <Route path="Login" element={<Login />} />
            <Route path="Favorites" element={<Favorites />} />
            <Route path="best" element={<Best />} />
            {/* 
            <Route path="/" element={<Navigate to="/Event" replace />} />
            <Route path="/Event" element={<Event />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<Navigate to="/Event" replace />} /> */}
          </Route>
  
          {/* 헤더 없이 보여줄 페이지들 */}
          <Route element={<WithoutHeader />}>
            <Route path="detail/:slug" element={<Detail />} />
            {/* 단독 /detail 진입을 허용하고 싶으면 아래 유지 */}
            <Route path="detail" element={<Detail />} />
            
          </Route>
  
          {/* 404 */}
          <Route path="*" element={<div style={{ padding: 40 }}>페이지를 찾을 수 없어요.</div>} />
        </Routes>
  
        <div className="floating-ask"><img src="/img/askicon.png" width="60" alt="help" /></div>
        
      </div>
      <Footer />
    </>
  );
}