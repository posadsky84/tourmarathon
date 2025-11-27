import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetRaceInfoQuery } from '../../redux/baseApi';
import Spinner from '../../components/Spinner/Spinner';
import { toFineDate } from '../../helper';
import "./pageRulesPreview.scss";

const PageRulesPreview = () => {

  const params = useParams();
  const [isPreviewLoading, setPreviewLoading] = useState(true);

   useEffect(() => {
     setTimeout(() => setPreviewLoading(false), 2000);
   }, []);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRaceInfoQuery(params.raceId);

  let content;
  if (isLoading) {
    content = (
      <div>
          <Spinner />
      </div>
    )
  } else if (isSuccess) {
    content = <>
      <Link className="rules-back-link" to="/">{`Назад`}</Link>
      <p className="tm-card-caption">{data.name}</p>
      <p className="tm-card-ddate">
        {toFineDate(new Date(data.ddate))}
      </p>
      <p className="tm-card-caption">ПОЛОЖЕНИЕ</p>
      <iframe
        src={`${data.rulesLink}/preview`}
        style={{ width: "100%", height: "5000px", border: 0, marginTop: "8px" }}
        allow="autoplay"
        title="pdf"
      >

      </iframe>
    </>;


  } else if (isError) {
    content = (
      <div>
        Ошибка: {error}
      </div>
    )
  }

  return (
    <div className="content-column">
      {isPreviewLoading && <div className="loading-backscreen"><Spinner /></div>}
      <div className="page-main">
        {content}
      </div>
    </div>
  );
};

export default PageRulesPreview;
