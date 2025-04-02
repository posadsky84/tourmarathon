import { useGetAllRunnersDataQuery } from '../../redux/baseApi';
import './pageAllRunners.scss';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { AutoSizer, List } from 'react-virtualized';


const RunnerRow =({item, index, racesVector}) => {

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

};


const PageAllRunners = () => {

  const YEAR_START = 2017;

  const [searchStr, setSearchStr] = useState("");
  const [doSortAlphabet, setDoSortAlphabet] = useState(false);
  const [oneRunnersCount, setOneRunnersCount] = useState(0);
  const [listData, setListData] = useState([]);
  const [readyFlag, setReadyFlag] = useState(false);

  const {
    data,
    isLoading: runnersIsLoading,
    isSuccess: runnersIsSuccess,
    isError: runnersIsError,
  } = useGetAllRunnersDataQuery();

  useEffect(() => {
    if (runnersIsSuccess) {
      setOneRunnersCount(data.runners.filter(item => item.startsCount === 1).length);

      let nextRunners;
      if (doSortAlphabet) {
        nextRunners = [...data.runners].sort((a, b) => a.lastName < b.lastName ? -1 : 1);
      } else {
        nextRunners = data.runners;
      }

      const list = nextRunners.map(
        (item, index) => (<RunnerRow item={item} index={index} racesVector={data.racesVector}/>)
      );

      setListData(list);
      setReadyFlag(true);
    }
  }, [runnersIsSuccess, doSortAlphabet]);

  return (<>
    <div className="all-runners-controller-block">
      <div className="search-block">
        <input className="search-input" onChange={e => setSearchStr(e.target.value)} value={searchStr}></input>
      </div>
      <div onClick={() => setDoSortAlphabet(!doSortAlphabet)}>ВЫБОР ФИЛЬТРА</div>
      <div>К-во бегунов по одному участию: {oneRunnersCount}</div>
    </div>
    <div className="res-table-all-runners">
      <div className="table-row-all-runners">
        <div className="table-cell table-head-cell">Участник</div>
        <div className="table-cell table-head-cell">Кол-во стартов</div>
        {new Array(new Date().getFullYear() - YEAR_START + 1).fill(0)
          .map((_, index) => YEAR_START + index).reverse()
          .map(item => <div className="table-cell table-head-cell">{item}</div>)}
      </div>
        {!readyFlag && <Spinner />}

      <div className="res-table-all-runners">
      <AutoSizer>
        {({height, width}) =>
        <List className="virtualized-list-runners"
          height={height}
          rowCount={listData.length}
          rowHeight={35}
          width={width}
          rowRenderer={({ index, key, style }) => (
            <div className="table-row-all-runners" key={key} style={style}>{listData[index]}</div>
          )}
        />
        }
      </AutoSizer>
      </div>


    </div>
  </>);

};

export default PageAllRunners;
