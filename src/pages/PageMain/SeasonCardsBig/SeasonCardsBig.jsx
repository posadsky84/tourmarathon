import './seasonCardsBig.scss';
import { getStrapiImageUrl, raceStatus, toFineDate } from '../../../helper';
import CourseSticker from '../../../components/CourseSticker/CourseSticker';
import React from 'react';
import { Link } from 'react-router-dom';

const onCardLinkClick = e => e.stopPropagation();

const SeasonCardsBig = ({data}) => {

  return (
    <div className="tm-cards-wrapper">
      {data.data.map(card => {
        return (
          <Link
            className={`tm-card 
            ${!card.attributes.status ? "blocked" : ""} 
            ${card.attributes.status === raceStatus.opened ? `tm-card-opened` : ``}`}
            key={card.id}
            target={card.attributes.status === raceStatus.opened ? `_blank` : undefined}
            to={card.attributes.status === raceStatus.opened ? card.attributes.regLink : `/races/${card.id}`}
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
                {toFineDate(new Date(card.attributes.ddate))}{card.attributes.location ? ", " + card.attributes.location : ""}
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
                  <Link className="tm-card-document" to={`/races/${card.id}/document`} onClick={onCardLinkClick}>
                    Положение
                  </Link>
                  <a
                    className="tm-card-registration-button"
                    href={card.attributes.regLink}
                    onClick={onCardLinkClick}
                    target='_blank'
                  >
                    Регистрация
                  </a>
                  <a
                    className="tm-card-list"
                    href={card.attributes.raceDocLink}
                    onClick={onCardLinkClick}
                    target='_blank'
                  >
                    Список участников
                  </a>
                </>
              )}
            </div>
            {!card.attributes.status && (
              <div className="tm-card-disabled-block">скоро</div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SeasonCardsBig;
