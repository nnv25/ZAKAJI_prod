import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
          <NavLink to="/addshop" className="sidebar-option">
            <img className='sidebar-img' src={assets.shop_add} alt="" />
            <p className='option-txt'>Добавить ресторан</p>
          </NavLink>
        <NavLink to="/addproduct" className="sidebar-option">
          <img className='sidebar-img' src={assets.item_add} alt="" />
          <p className='option-txt'>Добавить блюдо</p>
        </NavLink>
        <NavLink to="/updateshop" className="sidebar-option">
          <img className='sidebar-img' src={assets.edit_icon} alt="" />
          <p className='option-txt'>Редактировать информацию о ресторане</p>
        </NavLink>
          <NavLink to="/shoplist" className="sidebar-option">
            <img className='sidebar-img' src={assets.shop_icon} alt="" />
            <p className='option-txt'>Список ресторанов</p>
          </NavLink>
        <NavLink to="/productlist" className="sidebar-option">
          <img className='sidebar-img' src={assets.item_icon} alt="" />
          <p className='option-txt'>Список блюд</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img className='sidebar-img' src={assets.order_icon2} alt="" />
          <p className='option-txt'>Список заказов</p>
        </NavLink>
        <NavLink to="/ratinglist" className="sidebar-option">
          <img className='sidebar-img' src={assets.review_icon} alt="" />
          <p className='option-txt'>Список отзывов</p>
        </NavLink>
        <NavLink to="/administrator" className="sidebar-option">
          <img className='sidebar-img' src={assets.moderator_icon} alt="" />
          <p className='option-txt'>Добавление модераторов</p>
        </NavLink>
        <NavLink to="/userlist" className="sidebar-option">
          <img className='sidebar-img' src={assets.user_icon} alt="" />
          <p className='option-txt'>Список посетителей</p>
        </NavLink>
        <NavLink to="/balance" className="sidebar-option">
          <img className='sidebar-img' src={assets.balance_icon} alt="" />
          <p className='option-txt'>Направление пуш уведомлений</p>
        </NavLink>
        <NavLink to="/balance-update" className="sidebar-option">
          <img className='sidebar-img' src={assets.balance_edit_icon} alt="" />
          <p className='option-txt'>Добавление баннера на главную страницу</p>
        </NavLink>
        <NavLink to="/balance-update" className="sidebar-option">
          <img className='sidebar-img' src={assets.balance_edit_icon} alt="" />
          <p className='option-txt'>Редактирование категорий блюд</p>
        </NavLink>
        <NavLink to="/metric" className="sidebar-option">
          <img className='sidebar-img' src={assets.metric_icon} alt="" />
          <p className='option-txt'>Метрики</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
