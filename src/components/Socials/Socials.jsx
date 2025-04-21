import vklogo from '../../assets/img/vklogo.svg';
import tglogo from '../../assets/img/tglogo.svg';
import "./socials.scss";

const Socials = () => {

  const iconSize = 28;
  const tgLinkChannel = 'https://t.me/tourmarathon';
  const tgLinkChat = 'https://t.me/+47u-faJI4WhkNzIy';
  const vkLink = 'https://vk.com/tourmarathon';

  return (
      <div className="socials">
        <div className="soc">
          <div className="soc-pic">
            <a href={vkLink}><img src={vklogo} height={iconSize} width={iconSize}/></a>
          </div>
          <div className="soc-caption">
            <a href={vkLink}>Группа вконтакте</a>
          </div>
        </div>
        <div className="soc">
          <div className="soc-pic">
            <a href={tgLinkChannel}><img src={tglogo} height={iconSize} width={iconSize}/></a>
          </div>
          <div className="soc-caption">
            <a href={tgLinkChannel}>Официальный Телеграм-канал</a>
          </div>
        </div>
        <div className="soc">
          <div className="soc-pic">
            <a href={tgLinkChat}><img src={tglogo} height={iconSize} width={iconSize}/></a>
          </div>
          <div className="soc-caption">
            <a href={tgLinkChat}>Неофициальный Телеграм-чатик</a>
          </div>
        </div>
      </div>
  );
};

export default Socials;
