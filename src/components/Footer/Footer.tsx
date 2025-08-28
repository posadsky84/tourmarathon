import './footer.scss';
import Socials from "../Socials/Socials";
import tmlogo from '../../components/Header/tmlogo.png';

const EMAIL = `tourmarathon@gmail.com`;

const Footer = () => (
    <div className="footer">
        <div className="content-column">
            <div className="footer-wrapper">
                    <div className="footer-logo">
                        <img className="footer-logo" src={tmlogo} alt=""/>
                    </div>
                    <div className="footer-contacts">
                        <p>
                            Контакты:
                            <a className="footer-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        </p>
                        <p className="footer-admin">
                            Сайт:<a className="admin-link" href="/runners/admin">Алексей Посадский</a>
                        </p>
                    </div>
                <div className="footer-socials">
                    <Socials/>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;
