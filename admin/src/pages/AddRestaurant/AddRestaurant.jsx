import { useState } from "react";
import { assets } from "../../assets/assets";
import "./AddRestaurant.css";
import { useMask } from "@react-input/mask";

const AddShop = () => {

	const inputRef = useMask({ mask: "+7(999)999-99-99" });
	const [image, setImage] = useState(null);

  return (
    <div className="add">
      <div className="h2-item">
        <h3 className="item-h2">ДОБАВИТЬ РЕСТОРАН</h3>
      </div>
      <hr className="shop-info-divider" />
      <form className="flex-col">
        <div className="add-shop-name">
          <p className="shop-title">Название ресторана</p>
          <input
            type="text"
            name="name"
            placeholder="Введите название ресторана"
            required
            className="addshop-input"
          />
        </div>
        <div className="add-shop-worktime">
          <label className="shop-title" htmlFor="weekdays">
            Часы работы:
          </label>
          <div className="shop-worktime">
            <div className="addshop-container">
              <div className="shop-time-container">
                <p className="shop-title-time">Пн-пт</p>
              </div>
              <input
                id="weekdays"
                placeholder="Введите часы работы ресторана в будни"
                required
                className="addshop-input"
              />
            </div>
            <div className="addshop-container">
              <div className="shop-time-container">
                <p className="shop-title-time">Суб</p>
              </div>
              <input
                className="addshop-input"
                id="saturday"
                placeholder="Введите часы работы ресторана в субботу"
                required
              />
            </div>
            <div className="addshop-container">
              <div className="shop-time-container">
                <p className="shop-title-time">Вск</p>
              </div>
              <input
                className="addshop-input"
                id="saturday"
                placeholder="Введите часы работы ресторана в воскресенье"
                required
              />
            </div>
          </div>
        </div>
        <div className="add-shop-address">
          <p className="shop-title">Адрес</p>
          <input
            type="text"
            name="address"
            placeholder="Введите адрес ресторана"
            required
            className="addshop-input"
          />
        </div>
        <div className="add-shop-phone">
      <p className="shop-title">Телефон</p>
      <input
        ref={inputRef}
        type="tel"
        placeholder="Введите телефон ресторана"
        className="addshop-input"
        required
      />
    </div>
        <div className="add-shop-delivery">
          <p className="shop-title">Доставка:</p>
          <select
            name="delivery"
          >
            <option value="false">Нет</option>
            <option value="true">Да</option>
          </select>
        </div>
        <div className="add-img-upload flex-col">
          <p className="shop-title">Загрузить логотип ресторана</p>
          <label htmlFor="image">
             <img src={image ? URL.createObjectURL(image) : assets.shop_logo_load} alt="Upload area" />
          </label>
          <input
            type="file"
            id="image"
            required
            hidden
          />
        </div>
        <button type="submit" className="add-btn">
          Добавить ресторан
        </button>
      </form>
    </div>
  );
};

export default AddShop;
