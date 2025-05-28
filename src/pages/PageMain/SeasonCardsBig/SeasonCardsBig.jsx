import './seasonCardsBig.scss';
import { getStrapiImageUrl, raceStatus, toFineDate } from '../../../helper';
import CourseSticker from '../../../components/CourseSticker/CourseSticker';
import React from 'react';

const SeasonCardsBig = ({data}) => {

  return (<>
    {data.data.map(card => {
      return (
        <div className={`tm-card ${!card.attributes.status ? "blocked" : ""}`}>
          <div className="tm-card-image-wrapper">
            <img className="tm-card-image" alt=""
               src={getStrapiImageUrl(card.attributes.cardPicture.data?.attributes.url)}></img>
            {card.attributes.status === raceStatus.opened && (
              <div className="tm-card-registration-button">Регистрация</div>
            )}
          </div>
          <div className="tm-card-wrapper">
            <p className="tm-card-caption">{card.attributes.name}</p>
            <p className="tm-card-ddate">{toFineDate(new Date(card.attributes.ddate))}</p>
            <div className="tm-card-distances">
              {card.attributes.distances.data.toSorted((a, b) => {
                return a.attributes.km < b.attributes.km ? -1 : 1
              }).map(item => {
                return <CourseSticker type={item.attributes.courseType} value={item.attributes.km}/>
              })}
            </div>
          </div>
          {card.attributes.status === raceStatus.closed && <div className="tm-card-reslink">Результаты</div>}
          {card.attributes.status === raceStatus.opened && <div>список зарегистрированных</div>}
          {!card.attributes.status && <div className="tm-card-disabled-block">скоро</div>}
        </div>
      );
    })}
  </>);


};

export default SeasonCardsBig;
