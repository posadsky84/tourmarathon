import './resTable.css';
import { useGetRaceQuery, useGetTeamsQuery } from '../../redux/baseApi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';
import DnsLabel from '../../components/DnsLabel/DnsLabel';
import { resultToStr, toFineDateLong } from '../../helper';
import DnfLabel from '../../components/DnfLabel/DnfLabel';

dayjs.extend(duration);


const ResTable = () => {

    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCourseType = searchParams.get('distance');

    const {
        data: raceData,
        isLoading: raceIsLoading,
        isSuccess: raceIsSuccess,
    } = useGetRaceQuery(params.raceId);

    const selectedDistance = raceData?.distances.data.find(item => item.attributes.courseType === selectedCourseType)?.id
                             || (raceData && raceData.distances.data[0].id);

    const {
        data: distanceData,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTeamsQuery(
      {distanceId: selectedDistance,
       returnBadges: raceData?.distances.data.find(item => item.id === selectedDistance).attributes.km === 100,
      },
      {skip: !selectedDistance}
    );


    let tabs;
    let title;
    if (raceIsLoading) {

    } else if (raceIsSuccess) {
        tabs = (<div className="distance-bar">
            {raceData.distances.data.map(item => {
                return (
                  <div
                    className={`distance-item ${item.id === selectedDistance ? 'selected' : ''}`}
                    {...(item.id !== selectedDistance ? {
                        onClick: () => setSearchParams({ distance: item.attributes.courseType}
                        )
                    } : {})}
                  >
                    {item.attributes.name}
                    </div>
                );
            })}
        </div>);

        title = (<div className="res-title">
              <div className="res-title-name">{raceData.name}</div>
              <div className="res-title-info">{toFineDateLong(new Date(raceData.ddate))}, {raceData.location}</div>

          </div>);
    }

    let runnersContent;
    if (isLoading) {
        runnersContent = (
          <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading nah...</span>
              </div>
          </div>
        )
    } else if (isSuccess) {
        let rowNum = 0;
        runnersContent = distanceData.data.attributes.teams.data.map((teamItem) => {
            rowNum++;
            const teamBadges = [];
            const members = teamItem.attributes.members.data.filter(item => !item.attributes.child).sort((a,b) => a.id < b.id ? -1 : 1);
            const runnersChildren = teamItem.attributes.members.data.filter(item => item.attributes.child).sort((a,b) => a.id < b.id ? -1 : 1);
            const cellClass = (!(rowNum % 2) ? 'table-cell odd' : 'table-cell');
            return <>
                <div className={cellClass}>
                    <div className="cell-item">
                        <div className={teamItem.attributes.dns ? "dns" : ""}>{teamItem.attributes.name}</div>
                        {!!teamItem.attributes.dns && <DnsLabel />}
                        {!!teamItem.attributes.dnf && <DnfLabel />}
                    </div>
                </div>
                <div className={cellClass}>{members.map(memberItem => {

                  const runner = memberItem.attributes.runner.data.attributes;
                  const badge = runner.badges?.data
                    .filter(item => +item.attributes?.race.data.id === +params.raceId)[0]?.attributes.number;
                  if (badge) teamBadges.push(badge);

                  let strRunner = `${runner.lastName ? runner.lastName : ""}`;
                  strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
                  let strInfo = `${runner.year ? " " + runner.year : ""}`;
                    strInfo += `${runner.location ? " " + runner.location : ""}`;
                    return <div className="cell-item">
                        <Link className={`runner-link ${memberItem.attributes.dns || teamItem.attributes.dns ? "dns" : ""}`} to={`/runners/${memberItem.attributes.runner.data.id}`}>{strRunner}</Link>
                        <div className="runner-info">{strInfo}</div>
                        {!!memberItem.attributes.dns && <DnsLabel />}
                        {!!memberItem.attributes.dnf && <DnfLabel />}
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
                            <Link className={`runner-link ${runnerItem.attributes.dns || teamItem.attributes.dns ? "dns" : ""}`} to={`/runners/${runnerItem.attributes.runner.data.id}`}>{strRunner}</Link>
                            <div className="runner-info">{strInfo}</div>
                            {!!runnerItem.attributes.dns && <DnsLabel />}
                            {!!runnerItem.attributes.dnf && <DnfLabel />}
                        </div>;
                    })

                }
                </div>
                <div className={cellClass}>{teamItem.attributes.start ? dayjs(teamItem.attributes.start).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className={cellClass}>{teamItem.attributes.finish ? dayjs(teamItem.attributes.finish).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className={cellClass}>{resultToStr(teamItem.attributes.result)}</div>
                <div className={cellClass}>{teamItem.attributes.place}</div>
                <div className={cellClass}><Reward label={teamItem.attributes.reward} /></div>
                <div className={cellClass}>{teamBadges.join(", ")} {teamItem.attributes.comm}</div>
            </>
        })
    } else if (isError) {
        runnersContent = (
          <div className="alert alert-danger" role="alert">
              Ошибка: {error}
          </div>
        )
    }



    return (<>
        {title}
        {tabs}
        <div className="res-table">
            <div className="table-row">
                <div className="table-cell table-head-cell">Команда</div>
                <div className="table-cell table-head-cell">Участники</div>
                <div className="table-cell table-head-cell">Старт</div>
                <div className="table-cell table-head-cell">Финиш</div>
                <div className="table-cell table-head-cell">Время</div>
                <div className="table-cell table-head-cell">Место</div>
                <div className="table-cell table-head-cell"></div>
                <div className="table-cell table-head-cell"></div>
                {runnersContent}
            </div>
        </div>
    </>);
};

export default ResTable;
