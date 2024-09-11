import React from 'react';
import { useGetRacesQuery } from '../../redux/baseApi';
import './pageAllRaces.css';
import { getStrapiImageUrl } from '../../helper';
import { Link } from 'react-router-dom';
import CourseSticker from '../../components/CourseSticker/CourseSticker';


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
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isSuccess) {
    let curYear = 0;
    racesContent = allRaces.data.map(raceItem => {
      let divider;
      const itemYear = new Date(raceItem.attributes.ddate).getFullYear();
      if (curYear !== itemYear) {
        curYear = itemYear;
        divider = (<div className="year-divider">Турмарафон {itemYear}</div>);
      }
      return <>
        {divider}
        <div className="all-races-cell caption-cell">
          <img className="magnet-image" alt="" src={getStrapiImageUrl(raceItem.attributes.magnet.data?.attributes.url)}></img>
          <div className="race-caption">
            <Link to={`/races/${raceItem.id}`}>{raceItem.attributes.sname}</Link>
          </div>
          <div className="distances-cell">
            {raceItem.attributes.distances.data.toSorted((a, b) => {
              return a.attributes.km < b.attributes.km ? -1 : 1
            }).map(distanceItem => {
              return <Link className="distance-link" to={`/races/${raceItem.id}?distance=${distanceItem.attributes.courseType}`}>
                <CourseSticker type={distanceItem.attributes.courseType} value={distanceItem.attributes.km} />
              </Link>
            })}
          </div>
        </div>
        <div className="all-races-cell">{raceItem.attributes.location}</div>
        <div className="all-races-cell">{raceItem.attributes.ddate}</div>
        <div className="all-races-cell distances-cell">

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


  return (
    <div className="all-races-table">
      {racesContent}
    </div>
  );
};

export default PageAllRaces;
