import './pageMain.css';
import { useGetMainQuery } from '../../redux/baseApi';
import React from 'react';
import dayjs from 'dayjs';
import {raceStatus} from '../../helper';
import SeasonCardsBig from './SeasonCardsBig/SeasonCardsBig';
import ActualRaceBefore from './ActualRaceBefore/ActualRaceBefore';
import ActualRaceAfter from './ActualRaceAfter/ActualRaceAfter';

const PageMain = () => {
  const {
    data: mainPageData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMainQuery();

  let content;
  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isSuccess) {

    const soonRace = mainPageData.data.find(card => card.attributes.status === raceStatus.locationAnnounced ||
      card.attributes.status === raceStatus.registrationClosed);
    const recentFinishedRace = mainPageData.data.find(card => card.attributes.status === raceStatus.resultsPublished);

    if (soonRace) {
       content = (<ActualRaceBefore race={soonRace} />);
    } else if (recentFinishedRace) {
       content = (<ActualRaceAfter race={recentFinishedRace} />);
    } else {
        content = (<SeasonCardsBig data={mainPageData} />);
    }


  } else if (isError) {
    content = (
      <div className="alert alert-danger" role="alert">
        Ошибка: {error}
      </div>
    )
  }





  return (
    <div className="page-main">
      {content}
    </div>
  );
};

export default PageMain;
