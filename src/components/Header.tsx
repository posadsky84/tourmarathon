import './header.css';
import logo from './tmlogo.png';


const Header = () => {
    return <div className="header">
       <img src={logo} height="68" width="177" alt="Турмарафон"/>
    </div>;
}

export default Header;