import React from 'react';
import './ShopDropDown.css';

const ShopDropDown = ({ shops = [], selectedShop, onShopChange }) => {
  return (
    <div className='shopdropdown-container'>
      <select
        className="shop-dropdown"
        value={selectedShop || ''}
        onChange={(e) => onShopChange(e.target.value)}
      >
        <option value="" disabled>
          Выберите ресторан
        </option>

        {shops.length > 0 ? (
          shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))
        ) : (
          <option disabled>Нет доступных ресторанов</option>
        )}
      </select>
    </div>
  );
};

export default ShopDropDown;