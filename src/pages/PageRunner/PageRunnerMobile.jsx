import DnsLabel from '../../components/DnsLabel/DnsLabel';
import DnfLabel from '../../components/DnfLabel/DnfLabel';
import CourseSticker from '../../components/CourseSticker/CourseSticker';
import { Link } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';
import dayjs from 'dayjs';
import { resultToStr } from '../../helper';
import { useState } from 'react';
import './pageRunnerMobile.scss';

const RunnerCardMobile = ({teamContent, distanceContent, raceContent, runner, rowNum, year}) => {
  const [isOpened, setIsOpened] = useState(false);

  const cellClass = (!(rowNum % 2) ? 'run-card-mobile odd' : 'run-card-mobile');
  const raceId = distanceContent.race.data.id;

  return <>
    <div className={cellClass} onClick={() => setIsOpened(!isOpened)}>
        <div className="run-card-distance-mobile">
          <div className="run-card-race-short-name">
              <Link
                className="runner-link"
                to={`/races/${raceId}?selected=${runner.data.id}`}>
                {raceContent.sname} {year}
              </Link>
          </div>
          <CourseSticker type={distanceContent.courseType} value={distanceContent.km}/>
        </div>
      <div className="run-card-results-mobile">
        <div className="run-card-holder">Место</div>
          <div className="run-card-place-row-mobile">
            <div className="run-card-place-mobile">{teamContent.place}</div>
            <Reward label={teamContent.reward}/>
          </div>
      </div>
      <div className="run-card-team-mobile">
         {!!teamContent.name && <div className="run-card-holder">Команда</div>}
          <div className="run-card-team-name-mobile">{teamContent.name}</div>
          {!!teamContent.dns && <DnsLabel/>}
          {!!teamContent.dnf && <DnfLabel/>}
      </div>
      <div className="run-card-list-mobile">
        <div className="run-card-holder">Участники</div>
        {
          teamContent.members.data.map(coMemberItem => {
            let strRunner = `${coMemberItem.attributes.runner.data.attributes.lastName ? coMemberItem.attributes.runner.data.attributes.lastName : ""}`;
            strRunner += `${coMemberItem.attributes.runner.data.attributes.firstName ? " " + coMemberItem.attributes.runner.data.attributes.firstName : ""}`;

            if (coMemberItem.attributes.runner.data.id === runner.data.id) {
              return (<div className="run-card-member-mobile">
                <div className={`${coMemberItem.attributes.dns || teamContent.dns ? "dns" : ""}`}>
                  {strRunner}
                </div>
                {!!coMemberItem.attributes.dns && <DnsLabel/>}
                {!!coMemberItem.attributes.dnf && <DnfLabel/>}
              </div>);
            } else {
              return (<div className="run-card-member-mobile">
                <Link
                  className={`runner-link ${coMemberItem.attributes.dns || teamContent.dns ? "dns" : ""}`}
                  to={`/runners/${coMemberItem.attributes.runner.data.id}`}>
                  {strRunner}
                </Link>
                {!!coMemberItem.attributes.dns && <DnsLabel/>}
                {!!coMemberItem.attributes.dnf && <DnfLabel/>}
              </div>);
            }
          })
        }


      </div>
    </div>
    {isOpened && <div className="run-card-footer-mobile">
      {teamContent.start ? dayjs(teamContent.start).format('DD.MM.YYYY HH:mm') : ""}
      {teamContent.finish ? dayjs(teamContent.finish).format('DD.MM.YYYY HH:mm') : ""}
      {resultToStr(teamContent.result)}
    </div>}
  </>;
}

const PageRunnerMobile = ({teamsData, runner}) => {

  const teamsDataByYears = teamsData.reduce((res, item) => {
    const year = new Date(item.attributes.team.data.attributes.distance.data.attributes.race.data.attributes.ddate).getFullYear();
    if (!res[year]) res[year] = [];
    res[year].push(item);
    return res;
  }, {});


  let rowNum = 0;
  return Object.keys(teamsDataByYears).reverse().map(year => {

    let rowNum = 0;

    return (<>
      <div className="run-card-yr-mobile">
        {year}
      </div>
      {teamsDataByYears[year].toSorted((a, b) => {
        const ddate1 = new Date(a.attributes.team.data.attributes.distance.data.attributes.race.data.attributes.ddate);
        const ddate2 = new Date(b.attributes.team.data.attributes.distance.data.attributes.race.data.attributes.ddate);
        return ddate1 <= ddate2 ? 1 : -1;
      }).map(team => {
        rowNum += 1;
        const teamContent = team.attributes.team.data.attributes;
        const distanceContent = teamContent.distance.data.attributes;
        const raceContent = distanceContent.race.data.attributes;

        return <RunnerCardMobile teamContent={teamContent}
                                 distanceContent={distanceContent}
                                 raceContent={raceContent}
                                 runner={runner}
                                 rowNum={rowNum}
                                 year={year}
        />;


      })}
     </>)});

};

export default PageRunnerMobile;
