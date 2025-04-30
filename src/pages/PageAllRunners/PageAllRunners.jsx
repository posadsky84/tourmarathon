import { useGetAllRunnersDataQuery } from '../../redux/baseApi';
import './pageAllRunners.scss';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
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
            return visited ?
            (<Link className="story-cell-item visited" to={`/races/${raceItem.id}?selected=${item.id}`}>
                <div className="cell-hint">{`${raceItem.sname} ${yearItem}`}</div>
              </Link>) : <div className="story-cell-item"/>;
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

  const ROW_HEIGHT = 35;

  const doScroll = item => {
    if (listRef.current) {
      const offset = item * ROW_HEIGHT - 2 * ROW_HEIGHT;
      listRef.current.scrollToPosition(offset);
    }
  }

  const doSearch = () => {
    const res = data.runners
      .map((item, index) => (item.lastName && item.lastName.toUpperCase().includes(searchStr.toUpperCase()) ? index : -1))
      .filter(index => index !== -1);

    setSearchList(res);
    setCurSearchId(0);
    doScroll(res[0]);

  }

  const searchRight = () => {
    let newSearchId = curSearchId + 1;
    if (newSearchId === searchList.length) newSearchId = 0;
    setCurSearchId(newSearchId);

    doScroll(searchList[newSearchId]);

  }

  const searchLeft = () => {
    let newSearchId = curSearchId - 1;
    if (newSearchId === -1) newSearchId = searchList.length - 1;
    setCurSearchId(newSearchId);

    doScroll(searchList[newSearchId]);

  }

  const YEAR_START = 2017;
  const listRef = useRef(null);

  const [searchStr, setSearchStr] = useState("");
  const [doSortAlphabet, setDoSortAlphabet] = useState(false);
  const [oneRunnersCount, setOneRunnersCount] = useState(0);
  const [listData, setListData] = useState([]);
  const [readyFlag, setReadyFlag] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [curSearchId, setCurSearchId] = useState(-1);

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
        <div className="all-runners-search-button" onClick={doSearch}>поиск</div>
        <div className="all-runners-arrow" onClick={searchLeft}>{"<"}</div>
        <div className="all-runners-arrow" onClick={searchRight}>{">"}</div>
        <div>{curSearchId+1} / {searchList.length}</div>
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
          ref={listRef}
          height={height}
          rowCount={listData.length}
          rowHeight={ROW_HEIGHT}
          width={width}
          rowRenderer={({ index, key, style }) => (
            <div className={`table-row-all-runners ${index === searchList[curSearchId] ? "selected" : (searchList.includes(index) ? "listed" : "")}`}
                 key={key}
                 style={style}>{listData[index]}
            </div>
          )}
        />
        }
      </AutoSizer>
      </div>
    </div>
  </>);

};

export default PageAllRunners;
