import DnsLabel from '../../components/DnsLabel/DnsLabel';
import DnfLabel from '../../components/DnfLabel/DnfLabel';
import CourseSticker from '../../components/CourseSticker/CourseSticker';
import { Link } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';
import dayjs from 'dayjs';
import { resultToStr } from '../../helper';

const PageRunnerDesktop = ({teamsData, runner}) => {
  return teamsData.toSorted((a, b) => {
        const ddate1 = new Date(a.attributes.team.data.attributes.distance.data.attributes.race.data.attributes.ddate);
        const ddate2 = new Date(b.attributes.team.data.attributes.distance.data.attributes.race.data.attributes.ddate);
        return ddate1 <= ddate2 ? 1 : -1;
      }).map(team => {
        const teamContent = team.attributes.team.data.attributes;
        const distanceContent = teamContent.distance.data.attributes;
        const raceContent = distanceContent.race.data.attributes;
        const raceId = distanceContent.race.data.id;

        return <>
          <div className="runner-table-cell">
            <div className="cell-item">
              <div className={teamContent.dns ? "dns" : ""}>{teamContent.name}</div>
              {!!teamContent.dns && <DnsLabel/>}
              {!!teamContent.dnf && <DnfLabel/>}
            </div>
          </div>
          <div className="runner-table-cell">
            <Link
              className="runner-link"
              to={`/races/${raceId}?selected=${runner.data.id}`}>
              {raceContent.name}
            </Link>
          </div>
          <div className="runner-table-cell center">
            <div className="distances-cell">
              <CourseSticker type={distanceContent.courseType} value={distanceContent.km}/>
            </div>
          </div>
          <div className="runner-table-cell">{
            teamContent.members.data.map(coMemberItem => {
              let strRunner = `${coMemberItem.attributes.runner.data.attributes.lastName ? coMemberItem.attributes.runner.data.attributes.lastName : ""}`;
              strRunner += `${coMemberItem.attributes.runner.data.attributes.firstName ? " " + coMemberItem.attributes.runner.data.attributes.firstName : ""}`;

              if (coMemberItem.attributes.runner.data.id === runner.data.id) {
                return (<div className="cell-item">
                  <div className={`${coMemberItem.attributes.dns || teamContent.dns ? "dns" : ""}`}>
                    {strRunner}
                  </div>
                  {!!coMemberItem.attributes.dns && <DnsLabel/>}
                  {!!coMemberItem.attributes.dnf && <DnfLabel/>}
                </div>);
              } else {
                return (<div className="cell-item">
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
          }</div>
          <div className="runner-table-cell">{teamContent.place}</div>
          <div className="runner-table-cell"><Reward label={teamContent.reward}/></div>
          <div
            className="runner-table-cell">{teamContent.start ? dayjs(teamContent.start).format('DD.MM.YYYY HH:mm') : ""}</div>
          <div
            className="runner-table-cell">{teamContent.finish ? dayjs(teamContent.finish).format('DD.MM.YYYY HH:mm') : ""}</div>
          <div className="runner-table-cell">{resultToStr(teamContent.result)}</div>
        </>
        ;
        });
        };

export default PageRunnerDesktop;
