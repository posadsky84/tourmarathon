import { useGetAllRunnersDataQuery } from '../../redux/baseApi';
import './pageAllRunners.css';
import { Link } from 'react-router-dom';
import { memo, useState } from 'react';


const RunnerRow = memo(({item, index, racesVector}) => {

  const cellClass = (!(index % 2) ? 'table-cell odd' : 'table-cell');

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


const PageAllRunners = () => {

  const [searchStr, setSearchStr] = useState("");

  const {
    data: runnersData,
    isLoading: runnersIsLoading,
    isSuccess: runnersIsSuccess,
    isError: runnersIsError,
  } = useGetAllRunnersDataQuery();



  return (<>
    <div className="all-runners-controller-block">
      <div className="search-block">
        <input className="search-input" onChange={e => setSearchStr(e.target.value)} value={searchStr}></input>
      </div>
    </div>
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
        {runnersIsLoading && <div>Loading...</div>}
        {runnersIsSuccess && !searchStr && runnersData.runners.map(
          (item, index) => (<RunnerRow item={item} index={index} racesVector={runnersData.racesVector}/>)
        )}
        {runnersIsSuccess && !!searchStr && runnersData.runners
          .filter(item => item.lastName && item.lastName.indexOf(searchStr) !== -1)
          .map(
          (item, index) => (<RunnerRow item={item} index={index} racesVector={runnersData.racesVector}/>)
        )}
      </div>
    </div>
  </>);

};

export default PageAllRunners;
