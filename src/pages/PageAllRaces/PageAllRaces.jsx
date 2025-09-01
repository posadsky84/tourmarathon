import React from 'react';
import { useGetRacesQuery } from '../../redux/baseApi';
import './pageAllRaces.scss';
import { getStrapiImageUrl } from '../../helper';
import { Link } from 'react-router-dom';
import CourseSticker from '../../components/CourseSticker/CourseSticker';
import Spinner from '../../components/Spinner/Spinner';


const PageAllRaces = () => {

  const {
    data: allRaces,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRacesQuery();

  let racesContent;
  if (isLoading) {
    racesContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <Spinner />
        </div>
      </div>
    )
  } else if (isSuccess) {
    let curYear = 0;
    racesContent = allRaces.data
      .toSorted((a, b) => {

        const yearA = +a.attributes.ddate.slice(0, 4);
        const yearB = +b.attributes.ddate.slice(0, 4);

        return yearA > yearB
          ? -1
          : yearA === yearB ? (a.attributes.ddate < b.attributes.ddate ? -1 : 1)
                            : 1
       })
      .map(raceItem => {
        let divider;
        const itemYear = new Date(raceItem.attributes.ddate).getFullYear();
        if (curYear !== itemYear) {
          curYear = itemYear;
          divider = (<>
            <div className="year-divider-cell caption">Турмарафон {itemYear}</div>
            <div className="year-divider-cell caption2">Дистанции</div>
            <div className="year-divider-cell caption2">Участников</div>
          </>);
        }

      let courseStickers = [];
        let startedCounts = [];
        let totalStartedCount = 0;
        raceItem.attributes.distances.data.toSorted((a, b) => {
          return a.attributes.km < b.attributes.km ? -1 : 1
        }).forEach(distanceItem => {
          courseStickers.push((<Link className="distance-link" to={`/races/${raceItem.id}?distance=${distanceItem.attributes.courseType}`}>
            <CourseSticker type={distanceItem.attributes.courseType} value={distanceItem.attributes.km} />
          </Link>));
          totalStartedCount += distanceItem.attributes.runnersStartedCount;
          startedCounts.push({type: distanceItem.attributes.courseType, value: distanceItem.attributes.runnersStartedCount});
        });


        return <>
          {divider}
          <div className="all-races-cell caption-cell">
            <img className="magnet-image" alt=""
                 src={getStrapiImageUrl(raceItem.attributes.magnet.data?.attributes.url)}></img>
            <div className="race-caption">
              <Link className="distance-link" to={`/races/${raceItem.id}`}>{raceItem.attributes.sname}</Link>
              <div className="race-info">{raceItem.attributes.ddate}, {raceItem.attributes.location}</div>
              {/*<div className="race-info">*/}
              {/*  <div>{raceItem.attributes.ddate}</div>*/}
              {/*  <div>{raceItem.attributes.location}</div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="all-races-distances-cell">
            {courseStickers}
          </div>
          <div className="all-races-cell distances-cell">
            {!!totalStartedCount && (
              <p>
                <span className="cnt-span">{totalStartedCount} (</span>
                {startedCounts.map((item, index) => <><span>{index ? ` / ` : ``}</span><span
                  className={`cnt-span ${item.type}`}>{item.value}</span></>)}
                )</p>
            )}
          </div>
        </>;
    });
  } else if (isError) {
    racesContent = (
      <div className="alert alert-danger" role="alert">
        Ошибка: {error}
      </div>
    )
  }


  return (<div className="content-column">
      <div className="page-all-races">
      <div className="all-races-grid">
        {racesContent}
      </div>
      </div>
    </div>
    );
};

export default PageAllRaces;
