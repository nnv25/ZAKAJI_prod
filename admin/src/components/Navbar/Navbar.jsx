import "./Navbar.css";
import { assets } from "../../assets/assets";
import ShopDropDown from "../ShopDropDown/ShopDropDown";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="epl-logo" src={assets.logo_zakaji} alt="Логотип" />
      <div className="navbar-menu__container">
        <ShopDropDown />
        <button className="reset-shop-button">Сбросить ресторан</button>
      </div>
      <div className="exit-container">
        <button className="exit-shop-button">
          <img src={assets.logout_icon} alt="Выйти" className="logout-icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
