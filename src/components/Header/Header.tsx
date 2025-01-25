import './header.scss';
import logo from './tmlogo.png';
import {Link} from "react-router-dom";
import BurgerButton from "./BurgerButton/BurgerButton";
import {useState} from "react";


const Header = () => {

    const [burgerOpened, setBurgerOpened] = useState(false);

    const MenuItems = () => (<>
        <Link className="link-header" to="allRaces" onClick={() => setBurgerOpened(false)}>Все соревнования</Link>
        <Link className="link-header" to="allRunners" onClick={() => setBurgerOpened(false)}>Все участники</Link>
        <Link className="link-header" to="/pff" onClick={() => setBurgerOpened(false)}>О нас</Link>
    </>);


    return (<>
        <div className="header">
        <div className="tm-logo">
            <Link to="/"><img src={logo} height="68" width="177" alt="Турмарафон"/></Link>
        </div>

        <div className="menu-header">
            <MenuItems />
        </div>

        <div className="header-burger-button" onClick={() => setBurgerOpened(!burgerOpened)}>
            <BurgerButton isOpened={burgerOpened}/>
        </div>
    </div>
        {burgerOpened && <div className="modal-back" onClick={() => setBurgerOpened(false)}/>}
        {burgerOpened && <div className="mobile-head-menu">
          <MenuItems />
        </div>}
    </>);
}

export default Header;