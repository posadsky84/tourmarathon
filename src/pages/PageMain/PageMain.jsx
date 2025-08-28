import './pageMain.scss';
import { useGetMainPageInfoQuery, useGetMainQuery } from '../../redux/baseApi';
import React from 'react';
import {raceStatus} from '../../helper';
import SeasonCardsBig from './SeasonCardsBig/SeasonCardsBig';
import ActualRaceBefore from './ActualRaceBefore/ActualRaceBefore';
import ActualRaceAfter from './ActualRaceAfter/ActualRaceAfter';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Spinner from '../../components/Spinner/Spinner';

const PageMain = () => {
  const {
    data: mainPageData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMainQuery();

  const {
    data: page,
    isLoading: infoIsLoading,
    isSuccess: infoIsSuccess ,
    isError: infoIsError,
  } = useGetMainPageInfoQuery();

  let content;
  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <Spinner />
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

let infoBlock;

if (infoIsLoading) {
  infoBlock = <></>;
} else if (infoIsSuccess) {
  infoBlock = <BlocksRenderer content={page.data.attributes.tmBasicInfo} />;
}


  return (
    <div className="content-column">
      <div className="page-main">
        <div className="page-main-info">{infoBlock}</div>
        {content}
      </div>
    </div>
      );
      };

export default PageMain;
