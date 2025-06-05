import './footer.scss';
import Socials from "../Socials/Socials";
import tmlogo from '../../components/Header/tmlogo.png';


const Footer = () => {


    return (
        <div className="footer">
            <div className="content-column">
                <div className="footer-wrapper">
                <div className="footer-left">
                    <div className="footer-logo">
                        <img className="footer-logo" src={tmlogo} alt=""/>
                        <div>
                        <div className="footer-text">По всем вопросам: </div><div>tourmarathon@gmail.com</div>
                        </div>
                        <div className="footer-text">Сайт: Алексей Посадский</div>
                    </div>
                </div>
                <Socials />
            </div>
            </div>
        </div>
    );
};

export default Footer;
