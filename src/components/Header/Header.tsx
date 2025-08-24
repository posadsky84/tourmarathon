import './header.scss';
import logo from './tmlogo.png';
import {Link, useLocation} from "react-router-dom";
import BurgerButton from "./BurgerButton/BurgerButton";
import {useState} from "react";
import {SITE_MENU} from "./constants";


const Header = () => {

    const [burgerOpened, setBurgerOpened] = useState(false);
    const {pathname} = useLocation();

    const menuItems = SITE_MENU.map(item => <Link className={`link-header ${pathname === item.link ? "selected" : ""}`} to={item.link} onClick={() => setBurgerOpened(false)}>{item.title}</Link>);


        return (<>
        <div className="header">
            <div className="logo-wrapper">
                <Link to="/" className="tm-logo">
                    <img src={logo} height="68" width="177" alt="Турмарафон"/>
                    <div className="tm-logo-year">{new Date().getFullYear()}</div>
                </Link>
            </div>

            <div className="menu-header">
                {menuItems}
            </div>

            <div className="header-burger-button" onClick={() => setBurgerOpened(!burgerOpened)}>
                <BurgerButton isOpened={burgerOpened}/>
            </div>
        </div>
        {burgerOpened && <div className="modal-back" onClick={() => setBurgerOpened(false)}/>}
        {burgerOpened && <div className="mobile-head-menu">
            {menuItems}
        </div>}
    </>);
}

export default Header;