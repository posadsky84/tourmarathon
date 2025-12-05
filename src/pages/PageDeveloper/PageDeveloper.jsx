import { useDispatch, useSelector } from 'react-redux';
import { setIsDeveloperModalOpen } from '../../redux/uiSlice';
import ModalScreen from '../helpers/modalScreen';
import React, { useState } from 'react';
import './pageDeveloper.scss';
import { useGetDevPageInfoQuery, usePostFeedbackMutation } from '../../redux/baseApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import tglogo from '../../assets/img/tglogo.svg';
import '../../components/Socials/socials.scss';

const CrossButton = ({closeCallback}) => {

  return (
  <div className="close-button" onClick={closeCallback}>
  <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" />
    <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  </div>);
};


const PageDeveloper = () => {

  const {
    data: devPageData,
    isSuccess: infoIsSuccess,
  } = useGetDevPageInfoQuery();


  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");


  const [
    postFeedback,
    { isSuccess },
  ] = usePostFeedbackMutation();

  const onClose = () => {
    dispatch(setIsDeveloperModalOpen(false));
  }

  const iconSize = 28;
  const tgLinkMy = 'https://t.me/leviathan_mai';
  const tgLinkChannel = 'https://t.me/+47u-faJI4WhkNzIy';

  return (
    <ModalScreen closeCallback={onClose} fullScreen>

      {infoIsSuccess && <div className="page-dev-info">
        <CrossButton closeCallback={onClose}/>
        <BlocksRenderer content={devPageData.data.attributes.devPageInfo}/></div>}

      <div className="telegram-grid">
      <div className="socials">
        <div className="soc">
          <div className="soc-pic">Телега разработчика:</div>
          <div className="soc-pic">
            <a href={tgLinkMy}><img src={tglogo} height={iconSize} width={iconSize}/></a>
          </div>
          <div className="soc-caption">
            <a href={tgLinkMy}>Alexey Posadsky</a>
          </div>
        </div>
      </div>
      <div className="socials">
        <div className="soc">
          <div className="soc-pic">Чатик Турмарафона: </div>
          <div className="soc-pic">
            <a href={tgLinkChannel}><img src={tglogo} height={iconSize} width={iconSize}/></a>
          </div>
          <div className="soc-caption">
            <a href={tgLinkChannel}>Неоф.чат Турмарафон</a>
          </div>
        </div>
      </div>
      </div>

      {isSuccess ? <div className="mark-sent">Сообщение отправлено!</div> :
      <>Пишите нам:
      <div className="comm-post-area">
            <textarea
              className="comm-input"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => {
                if (e.key === `Enter`) postFeedback({ message: msg });
              }}
            />
        <div className="send-feedback-button" onClick={() => postFeedback({ message: msg })}>Отправить</div>

      </div></>
      }


    </ModalScreen>
  );
};

export default PageDeveloper;
