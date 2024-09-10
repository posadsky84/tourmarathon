import { useGetAllRunnersDataQuery, useGetRacesQuery } from '../../redux/baseApi';
import './pageAllRunners.css';
import { Link } from 'react-router-dom';

const PageAllRunners = () => {

  const {
    data: allRaces,
    isLoading: racesIsLoading,
    isSuccess: racesIsSuccess,
    isError: racesIsError,
    error: racesError,
  } = useGetRacesQuery();

  let racesVector;
  if (racesIsLoading) {

  } else if (racesIsSuccess) {

    racesVector = allRaces.data.reduce((acc, raceItem) => {
      const curYear = raceItem.attributes.ddate.slice(0, 4);
      const nextCell = {code: raceItem.attributes.sname.slice(0, 1).toUpperCase(), id: raceItem.id};

      return {...acc,
        [curYear]: acc[curYear]
          ? [nextCell, ...acc[curYear]]
          : [nextCell],
      }
    },{});




  } else if (racesIsError) {

  }

  const {
    data: runnersData,
    isLoading: runnersIsLoading,
    isSuccess: runnersIsSuccess,
    isError: runnersIsError,
  } = useGetAllRunnersDataQuery();

  let runnersContent;

  if (runnersIsLoading) {
    runnersContent = (
          <span>Loading...</span>
    )
  } else if (runnersIsSuccess) {
    let rowNum = 0;

    runnersContent = runnersData.map(item => {
      rowNum++;
      const cellClass = (!(rowNum % 2) ? 'table-cell odd' : 'table-cell');

      let strRunner = `${item.lastName ? item.lastName : ""}`;
      strRunner += `${item.firstName ? " " + item.firstName : ""}`;
      let strInfo = `${item.year ? " " + item.year : ""}`;
      strInfo += `${item.location ? " " + item.location : ""}`;

      const storyVector = Object.keys(racesVector).reverse().map(yearItem => {
        return <div className={cellClass}>
          <div className="story-cell">

            {
              racesVector[yearItem].map(raceItem => {
                const visited = (item.startsVector.find(i => i === raceItem.id) > -1);
                return <div className={`story-cell-item ${visited ? "visited" : ""}`}></div>;
              })
            }

          </div>
        </div>

      });

      return (<>
         <div className={cellClass}>
           <div className="cell-item">
             <Link className="runner-link" to={`/runners/${item.id}`}>{strRunner}</Link>
             <div className="runner-info">{strInfo}</div>
           </div>
         </div>
         <div className={cellClass}>{item.startsCount}</div>
          {storyVector}
      </>
    );
    });


  }

  return (<>
    <div className="res-table-all-runners">
      <div className="table-row-all-runners">
        <div className="table-cell table-head-cell">Участник</div>
        <div className="table-cell table-head-cell">Кол-во стартов</div>
        <div className="table-cell table-head-cell">2024</div>
        <div className="table-cell table-head-cell">2023</div>
        <div className="table-cell table-head-cell">2022</div>
        <div className="table-cell table-head-cell">2021</div>
        <div className="table-cell table-head-cell">2020</div>
        <div className="table-cell table-head-cell">2019</div>
        <div className="table-cell table-head-cell">2018</div>
        <div className="table-cell table-head-cell">2017</div>
        {runnersContent}
      </div>
    </div>
  </>);

};

export default PageAllRunners;
