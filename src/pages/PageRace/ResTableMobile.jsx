import DnsLabel from '../../components/DnsLabel/DnsLabel';
import DnfLabel from '../../components/DnfLabel/DnfLabel';
import { resultToStr } from '../../helper';
import { Link } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';

const ResTableMobile = ({teamItem, members, runnersChildren, rowNum, params, selected})  => {

  const teamBadges = [];
  let cellClass = (!(rowNum % 2) ? 'mobil-card odd' : 'mobil-card');
  if (selected) {
    let checkSelected = members.find(memberItem => +memberItem.attributes.runner.data.id === +selected);
    if (!checkSelected) checkSelected = runnersChildren.find(memberItem => +memberItem.attributes.runner.data.id === +selected);
    if (checkSelected) cellClass += ' selected';
  }
  return <div className={cellClass}>

    <div className="mobil-team">

      {/*команда*/}
      <div className="mobil-team-caption">
        <div className={teamItem.attributes.dns ? "dns" : ""}>{teamItem.attributes.name}</div>
        {!!teamItem.attributes.dns && <DnsLabel/>}
        {!!teamItem.attributes.dnf && <DnfLabel/>}
        <p>{resultToStr(teamItem.attributes.result)}</p>
      </div>

      {/*участники + включая детей*/}
      {members.map(memberItem => {

        const runner = memberItem.attributes.runner.data.attributes;
        const badge = runner.badges?.data
          .filter(item => +item.attributes?.race.data.id === +params.raceId)[0]?.attributes.number;
        if (badge) teamBadges.push(badge);

        let strRunner = `${runner.lastName ? runner.lastName : ""}`;
        strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
        let strInfo = `${runner.year ? " " + runner.year : ""}`;
        strInfo += `${runner.location ? " " + runner.location : ""}`;
        return <div className="cell-item">
          <Link
            className={`runner-link ${memberItem.attributes.dns || teamItem.attributes.dns ? "dns" : ""}`}
            to={`/runners/${memberItem.attributes.runner.data.id}`}>{strRunner}</Link>
          <div className="runner-info">{strInfo}</div>
          {!!memberItem.attributes.dns && <DnsLabel/>}
          {!!memberItem.attributes.dnf && <DnfLabel/>}
        </div>;
      })}
      {(!!runnersChildren.length) && <div>ДЕТИ: </div>}
      {(!!runnersChildren.length) &&
        runnersChildren.map(runnerItem => {
          const runner = runnerItem.attributes.runner.data.attributes;

          const badge = runner.badges?.data
            .filter(item => +item.attributes?.race.data.id === +params.raceId)[0]?.attributes.number;
          if (badge) teamBadges.push(badge);

          let strRunner = `${runner.lastName ? runner.lastName : ""}`;
          strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
          let strInfo = `${runner.year ? " " + runner.year : ""}`;
          strInfo += `${runner.location ? " " + runner.location : ""}`;
          return <div className="cell-item">
            <Link
              className={`runner-link ${runnerItem.attributes.dns || teamItem.attributes.dns ? "dns" : ""}`}
              to={`/runners/${runnerItem.attributes.runner.data.id}`}>{strRunner}</Link>
            <div className="runner-info">{strInfo}</div>
            {!!runnerItem.attributes.dns && <DnsLabel/>}
            {!!runnerItem.attributes.dnf && <DnfLabel/>}
          </div>;
        })

      }

    </div>
    <div className="mobil-place">
      {teamItem.attributes.place}
    </div>
    <div className="mobil-medal">
      <Reward label={teamItem.attributes.reward}/>
    </div>

    {/*<div*/}
    {/*  className={cellClass}>{teamItem.attributes.start ? dayjs(teamItem.attributes.start).format('DD.MM.YYYY HH:mm') : ""}</div>*/}
    {/*<div*/}
    {/*  className={cellClass}>{teamItem.attributes.finish ? dayjs(teamItem.attributes.finish).format('DD.MM.YYYY HH:mm') : ""}</div>*/}
    {/*<div className={cellClass}>{resultToStr(teamItem.attributes.result)}</div>*/}
    {/*<div className={cellClass}>{teamBadges.join(", ")} {teamItem.attributes.comm}</div>*/}
  </div>




};

export default ResTableMobile;
