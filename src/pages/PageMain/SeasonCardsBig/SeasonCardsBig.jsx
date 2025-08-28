import './seasonCardsBig.scss';
import { getStrapiImageUrl, raceStatus, toFineDate } from '../../../helper';
import CourseSticker from '../../../components/CourseSticker/CourseSticker';
import React from 'react';

const SeasonCardsBig = ({data}) => {

  return (
    <div className="tm-cards-wrapper">
      {data.data.map(card => {
        return (
          <div
            className={`tm-card 
            ${!card.attributes.status ? "blocked" : ""} 
            ${card.attributes.status === raceStatus.opened ? `tm-card-opened` : ``}`}
            key={card.id}
          >
            <div className="tm-card-image-wrapper">
              <img
                className="tm-card-image"
                alt=""
                src={getStrapiImageUrl(card.attributes.cardPicture.data?.attributes.url)}
              />
            </div>
            <div className="tm-card-wrapper">
              <p className="tm-card-caption">{card.attributes.name}</p>
              <p className="tm-card-ddate">
                {toFineDate(new Date(card.attributes.ddate))}{card.attributes.location ? ", " + card.attributes.location: ""}
              </p>

              <div className="tm-card-distances">
                {card.attributes.distances.data.toSorted((a, b) => {
                  return a.attributes.km < b.attributes.km ? -1 : 1
                }).map((item, index) => {
                  return (
                    <CourseSticker
                      key={index}
                      type={item.attributes.courseType}
                      value={item.attributes.km}
                    />
                  );
                })}
              </div>

              {card.attributes.status === raceStatus.opened && (
                <>
                  <a className="tm-card-document">Положение</a>
                  <div className="tm-card-registration-button">Регистрация</div>
                </>
              )}
            </div>
            {/*{card.attributes.status === raceStatus.closed && (*/}
            {/*  <div className="tm-card-reslink">Результаты</div>*/}
            {/*)}*/}
            {/*{card.attributes.status === raceStatus.opened && (*/}
            {/*  <div>список зарегистрированных</div>*/}
            {/*)}*/}
            {!card.attributes.status && (
              <div className="tm-card-disabled-block">скоро</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SeasonCardsBig;
