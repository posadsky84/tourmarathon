import React from 'react';
import { useGetRacesQuery } from '../../redux/baseApi';
import './pageAllRaces.css';
import { getStrapiImageUrl } from '../../helper';


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
    racesContent = allRaces.data.map(item => {
      return <>
        <div className="all-races-cell caption-cell">
          <img className="magnet-image" src={getStrapiImageUrl(item.attributes.magnet.data?.attributes.url)}></img>
          {item.attributes.sname}
        </div>
        <div className="all-races-cell">{item.attributes.location}</div>
        <div className="all-races-cell">{item.attributes.ddate}</div>
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
