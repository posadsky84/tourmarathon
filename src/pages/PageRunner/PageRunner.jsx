import { Link, useParams } from 'react-router-dom';
import { useGetRunnerQuery } from '../../redux/baseApi';
import './pageRunner.css';
import dayjs from 'dayjs';
import Reward from '../../components/Reward/Reward';

const PageRunner = () => {

  let params = useParams();

  const {
   data: runner,
    isLoading,
    isSuccess,
    isError,
    error,
   } = useGetRunnerQuery(params.runnerId);

  let runnerContent;
  if (isLoading) {
    runnerContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading nah...</span>
        </div>
      </div>
    )
  } else if (isSuccess) {
    const headerData = runner.data.attributes;
    let teamsData = runner.data.attributes.teams.data;

    runnerContent = (<>
      <div className="runner-info-block">
        <div className="runner-info-field">{headerData.lastName} {headerData.firstName} {headerData.midName}</div>
        <div className="runner-info-field">{headerData.year}</div>
        <div className="runner-info-field">{headerData.location}</div>
      </div>
      <div className="runner-teams-block">

      </div>
      <div className="runner-teams-block">
      <div className="runner-table">
        <div className="runner-table-row">
          <div className="runner-table-cell runner-table-head-cell">Название</div>
          <div className="runner-table-cell runner-table-head-cell">Гонка</div>
          <div className="runner-table-cell runner-table-head-cell">Дистанция</div>
          <div className="runner-table-cell runner-table-head-cell">Место</div>
          <div className="runner-table-cell runner-table-head-cell">Прим.</div>
          <div className="runner-table-cell runner-table-head-cell">Состав команды</div>
          <div className="runner-table-cell runner-table-head-cell">Старт</div>
          <div className="runner-table-cell runner-table-head-cell">Финиш</div>
          <div className="runner-table-cell runner-table-head-cell">Время</div>

          {teamsData.toSorted((a, b) => {
            const ddate1 = new Date(a.attributes.distance.data.attributes.race.data.attributes.ddate);
            const ddate2 = new Date(b.attributes.distance.data.attributes.race.data.attributes.ddate);
            return ddate1 <= ddate2 ? 1 : -1;
          }).map(team => {

            const teamContent = team.attributes;
            const distanceContent = teamContent.distance.data.attributes;
            const raceContent = distanceContent.race.data.attributes;

            return <>
            <div className="runner-table-cell">{teamContent.name}</div>
            <div className="runner-table-cell">{raceContent.name}</div>
            <div className="runner-table-cell">{distanceContent.name}</div>
            <div className="runner-table-cell">{teamContent.place}</div>
            <div className="runner-table-cell"><Reward label={teamContent.comm} /></div>
            <div className="runner-table-cell"></div>
            <div className="runner-table-cell">{teamContent.start ? dayjs(teamContent.start).format('DD.MM.YYYY HH:mm') : ""}</div>
            <div className="runner-table-cell">{teamContent.finish ? dayjs(teamContent.finish).format('DD.MM.YYYY HH:mm') : ""}</div>
            <div className="runner-table-cell"></div></>;
          })}
        </div>
      </div>
      </div>
    </>);
  } else if (isError) {
    runnerContent = (
      <div className="alert alert-danger" role="alert">
        Ошибка: {error}
      </div>
    )
  }



  return (
    <div>
      {runnerContent}
    </div>
  );
};

export default PageRunner;
