import './pageMain.css';
import { useGetMainQuery } from '../../redux/baseApi';
import CourseSticker from '../../components/CourseSticker/CourseSticker';
import { getStrapiImageUrl } from '../../helper';
import React from 'react';

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
    content = (<>
      {mainPageData.data.map(card => {
        return <div className="tm-card">
          <img className="tm-card-image" alt="" src={getStrapiImageUrl(card.attributes.cardPicture.data?.attributes.url)}></img>
          <div className="tm-card-caption">{card.attributes.name}</div>
          <div className="tm-card-ddate">{card.attributes.ddate}</div>
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
