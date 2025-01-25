import './burgerButton.scss';

const BurgerButton = ({isOpened}) => {

  const openClass = isOpened ? 'open' : '';

  return (
    <svg className={`vbp-header-menu-button__svg ${openClass}`}>
      <line x1="0" y1="50%" x2="100%" y2="50%" className="top" />
      <line x1="0" y1="50%" x2="100%" y2="50%" className="middle" />
      <line x1="0" y1="50%" x2="100%" y2="50%" className="bottom" />
    </svg>
  );
};

export default BurgerButton;
