import './footer.scss';
import Socials from "../Socials/Socials";
import tmlogo from '../../components/Header/tmlogo.png';
import {SITE_MENU} from "../Header/constants";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIsDeveloperModalOpen} from "../../redux/uiSlice";
import PageDeveloper from "../../pages/PageDeveloper/PageDeveloper";
import React from "react";

const EMAIL = `tourmarathon@gmail.com`;

const menuItems = SITE_MENU.map(item => (
    <Link
        className="link-footer"
        key={item.link}
        to={item.link}
    >
        {item.title}
    </Link>
));

const Footer = () => {

    const isDeveloperModalOpen = useSelector(state => state.ui.isDeveloperModalOpen);
    const dispatch = useDispatch();


    return (<>
        {isDeveloperModalOpen && <PageDeveloper /> }
    <div className="footer">
        <div className="content-column">
            <div className="footer-wrapper">
                <div className="footer-logo">
                    <img className="footer-logo" src={tmlogo} alt=""/>
                </div>
                <div className="mobile-menu-footer">
                    {menuItems}
                </div>
                <div className="footer-contacts">
                    <p>
                        Контакты:
                        <a className="footer-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </p>
                    <p className="footer-admin">
                        Разработка сайта:<span className="admin-link" onClick={() => dispatch(setIsDeveloperModalOpen(true))}>Алексей Посадский</span>
                    </p>
                </div>
                <div className="footer-socials">
                    <Socials/>
                </div>
            </div>
        </div>
    </div>
        </>);
};

export default Footer;
