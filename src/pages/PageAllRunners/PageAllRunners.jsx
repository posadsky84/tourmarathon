import { useGetAllRunnersDataQuery } from '../../redux/baseApi';
import './pageAllRunners.scss';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { AutoSizer, List } from 'react-virtualized';

import searchIcon from './search.svg';


const RunnerRow =({item, index, racesVector}) => {

  const cellClass = (!(index % 2) ? 'table-cell odd' : 'table-cell');

  let strRunner = `${item.lastName ? item.lastName : ""}`;
  strRunner += `${item.firstName ? " " + item.firstName : ""}`;
  let strInfo = `${item.year ? " " + item.year : ""}`;
  strInfo += `${item.location ? " " + item.location : ""}`;

  const storyVector = Object.keys(racesVector).reverse().map(yearItem => {
    return <div className={`${cellClass} table-cell-crosstab`}>
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
      const offset = item > 1 ? item * ROW_HEIGHT - 2 * ROW_HEIGHT : item * ROW_HEIGHT;
      listRef.current.scrollToPosition(offset);
    }
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

  const [inputStr, setInputStr] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [doSortAlphabet, setDoSortAlphabet] = useState(false);
  const [oneRunnersCount, setOneRunnersCount] = useState(0);
  const [listData, setListData] = useState([]);
  const [readyFlag, setReadyFlag] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [curSearchId, setCurSearchId] = useState(-1);
  const [sortedRunners, setSortedRunners] = useState([]);

  const {
    data,
    isLoading: runnersIsLoading,
    isSuccess: runnersIsSuccess,
    isError: runnersIsError,
  } = useGetAllRunnersDataQuery();

  useEffect(() => {
    if (runnersIsSuccess) {
      setOneRunnersCount(data.runners.filter(item => item.startsCount === 1).length);

      setInputStr("");
      setSearchStr("");

      let nextRunners;
      if (doSortAlphabet) {
        nextRunners = [...data.runners].sort((a, b) => {
          if (!a.lastName) return 1;
          if (!b.lastName) return -1;
          return a.lastName < b.lastName ? -1 : 1;
        });
      } else {
        nextRunners = data.runners;
      }

      setSortedRunners(nextRunners);

      const list = nextRunners.map(
        (item, index) => (<RunnerRow item={item} index={index} racesVector={data.racesVector}/>)
      );

      setListData(list);
    }
  }, [runnersIsSuccess, doSortAlphabet]);

  useEffect(() => {
    if (listData.length) {
      doScroll(0);
      setReadyFlag(true);
    }
  }, [listData]);

  //Дебаунс для поисковой строки
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchStr(inputStr);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputStr]);

  //Выполнить поиск
  useEffect(() => {
    if (!searchStr.length) {
      setSearchList([]);
      return;
    }

    const res = sortedRunners
      .map((item, index) => (item.lastName && item.lastName.toUpperCase().includes(searchStr.toUpperCase()) ? index : -1))
      .filter(index => index !== -1);

    setSearchList(res);
    setCurSearchId(0);
    doScroll(res[0]);
  }, [searchStr, doSortAlphabet]);

  return (
    <div className="page-all-runners">
      <div className="all-runners-controller-block">
        <div className="search-block">
          <div className="all-runners-search-label">Поиск</div>
          <div className="search-input-wrapper">
            <img className="search-icon" src={searchIcon} alt='' />
            <input
              className="search-input"
              onChange={e => setInputStr(e.target.value)}
              value={inputStr}
            />
            {!!inputStr.length && (
              <div
                className="all-runners-cancel-search-button"
                onClick={() => {
                   setInputStr("");
                   setSearchStr("");
                 }}
              />
            )}
          </div>
          {!!searchList.length && (
            <div className="all-runners-arrows">
              <div className="all-runners-arrow left-arrow" onClick={searchLeft}/>
              <div className="all-runners-arrow right-arrow" onClick={searchRight}/>
              <div className="all-runners-search-counter">{curSearchId + 1} / {searchList.length}</div>
            </div>
          )}
          {searchStr && !searchList.length && <div className="all-runners-nothing-found-label">Ничего не найдено</div>}
        </div>
        <div className="all-runners-sort-selector">
          <div className={`all-runners-sort-button ${!doSortAlphabet ? "selected" : ""}`}
               {...(doSortAlphabet ? { onClick: () => setDoSortAlphabet(false) } : {})}
          >По кол-ву стартов</div>
          <div className={`all-runners-sort-button ${doSortAlphabet ? "selected" : ""}`}
               {...(!doSortAlphabet ? { onClick: () => setDoSortAlphabet(true) } : {})}
          >По алфавиту</div>
        </div>
        {/*<div>К-во бегунов по одному участию: {oneRunnersCount}</div>*/}
      </div>
      <div className="res-table-all-runners">
        <div className="table-row-all-runners">
          <div className="table-cell table-head-cell">Участник</div>
          <div className="table-cell table-head-cell">Стартов</div>
          {new Array(new Date().getFullYear() - YEAR_START + 1).fill(0)
            .map((_, index) => YEAR_START + index).reverse()
            .map(item => <div className="table-cell table-head-cell table-cell-crosstab">{item}</div>)}
        </div>
          {!readyFlag && <Spinner />}
          {/*{<Spinner />}*/}

        <div className="res-table-all-runners">
        <AutoSizer>
          {({height, width}) => (<>
            <List className="virtualized-list-runners"
                  ref={listRef}
                  height={height}
                  rowCount={listData.length}
                  rowHeight={ROW_HEIGHT}
                  width={width}
                  rowRenderer={({ index, key, style }) => (
                    <div
                      className={`table-row-all-runners ${index === searchList[curSearchId] ? "selected" : (searchList.includes(index) ? "listed" : "")}`}
                      key={key}
                      style={style}>{listData[index]}
                    </div>
                  )}
            /></>)
          }
        </AutoSizer>
        </div>
      </div>
    </div>
  );

};

export default PageAllRunners;
