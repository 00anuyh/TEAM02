import '../css/header.css'

/* 아이콘 */
import { IoSearch, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div id="mainheader">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}>
            <img src="/img/logo.png" alt="logo" id="logo" />
          </NavLink>
        </div>
      </header>

      <nav id="mainnav">
        <ul id="menu1">
          <li><NavLink to="/lifestyle" className={({ isActive }) => isActive ? "active" : undefined}>
            LIFESTYLE
          </NavLink></li>
          <li><NavLink to="/lighting" className={({ isActive }) => isActive ? "active" : undefined}>
            LIGHTING
          </NavLink></li>
          <li><NavLink to="/Objects" className={({ isActive }) => isActive ? "active" : undefined}>
            OBJECTS
          </NavLink></li>
          <li><NavLink to="/Community" className={({ isActive }) => isActive ? "active" : undefined}>
            COMMUNITY
          </NavLink></li>
        </ul>

        <ul id="menu2">
          <li><a href="#none"><IoSearch /></a></li>
          <li><NavLink to="/Login" className={({ isActive }) => isActive ? "active" : undefined}>
            <HiOutlineUser />
          </NavLink></li>
          <li><NavLink to="/Favorites" className={({ isActive }) => isActive ? "active" : undefined}>
            <IoHeartOutline />
          </NavLink></li>
          <li><NavLink to="/cart" className={({ isActive }) => isActive ? "active" : undefined}>
            <IoCartOutline />
          </NavLink></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
