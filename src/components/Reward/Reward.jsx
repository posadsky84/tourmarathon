import './reward.scss';

const Reward = ({label}) => {

  if (!label) return null;

  let cname = "medal";
  if (label.indexOf("М") > -1) cname += " medal-m";
  if (label.indexOf("Ж") > -1) cname += " medal-zh";
  if (label.indexOf("РД") > -1) cname += " medal-rd";
  if (label.indexOf("С") > -1) cname += " medal-s";

  return (
    <div className={cname}>
      {label}
    </div>
  );
};

export default Reward;
