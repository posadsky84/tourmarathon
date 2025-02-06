import './seasonCardsBig.scss';
import { getStrapiImageUrl, raceStatus, toFineDate } from '../../../helper';
import CourseSticker from '../../../components/CourseSticker/CourseSticker';
import React from 'react';

const SeasonCardsBig = ({data}) => {

  return (<>
    {data.data.map(card => {
      return <div className={`tm-card ${card.attributes.status === raceStatus.opened ? "actual" : ""}`}>
        <img className="tm-card-image" alt="" src={getStrapiImageUrl(card.attributes.cardPicture.data?.attributes.url)}></img>
        <div className="tm-card-caption">{card.attributes.name}</div>
        <div className="tm-card-ddate">{toFineDate(new Date(card.attributes.ddate))}</div>
        <div className="tm-card-distances">
          {card.attributes.distances.data.toSorted((a, b) => {
            return a.attributes.km < b.attributes.km ? -1 : 1
          }).map(item => {
            return <CourseSticker type={item.attributes.courseType} value={item.attributes.km}/>
          })}
        </div>
      </div>
    })}
  </>);


};

export default SeasonCardsBig;
