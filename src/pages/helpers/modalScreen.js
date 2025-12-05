import WrapperClickOutside from './wrapperClickOutside';
import './modalScreen.css';

const ModalScreen = ({closeCallback, children, fullScreen}) => {
  return (
    <div className="modal-back-modal">
      <WrapperClickOutside closeCallback={closeCallback} >
        <div className={`div-modal ${fullScreen ? `fullscreen` : ``}` }
             // style={{height: window.innerHeight, width: window.innerWidth}}
        >
          {children}
        </div>
      </WrapperClickOutside>
    </div>
  );
};

export default ModalScreen;
