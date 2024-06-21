import './header.css';
import logo from './tmlogo.png';
import {Link} from "react-router-dom";


const Header = () => {
    return <div className="header">
        <Link to="/"><img src={logo} height="68" width="177" alt="Турмарафон"/></Link>
        <Link to="allRaces">Все турмарафоны</Link>
    </div>;
}

export default Header;