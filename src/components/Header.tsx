import './header.css';
import logo from './tmlogo.png';
import {Link} from "react-router-dom";


const Header = () => {
    return <div className="header">
        <div className="tm-logo">
            <Link to="/"><img src={logo} height="68" width="177" alt="Турмарафон"/></Link>
        </div>

        <div className="menu-header">
            <Link className="link-header" to="/pff">Как принять участие?</Link>
            <Link className="link-header" to="allRaces">Все соревнования</Link>
            <Link className="link-header" to="allRunners">Все участники</Link>
            <Link className="link-header" to="/pff">О нас</Link>
        </div>
    </div>;
}

export default Header;