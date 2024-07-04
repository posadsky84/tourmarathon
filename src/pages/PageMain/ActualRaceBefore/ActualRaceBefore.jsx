import './actualRaceBefore.css';
import { MapPreview } from '../../../components/MapPreview/MapPreview';
import { useGetPageRaceBeforeQuery } from '../../../redux/baseApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const ActualRaceBefore = ({race}) => {

  const {
    data: page,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPageRaceBeforeQuery();

  let content;
  let infoComponent;
  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isSuccess) {
    infoComponent = (<BlocksRenderer content={page.data.attributes.hotText} />);

  } else if (isError) {
    content = (
      <div className="alert alert-danger" role="alert">
        Ошибка: {error}
      </div>
    )
  }



  return (<>
    <div className="rb-header">
      <div className="rb-header-caption">{race.attributes.name}</div>
      <div className="rb-header-ddate-loc">{`${race.attributes.ddate}, ${race.attributes.location}`}</div>
    </div>
    <div className="rb-body">
      <MapPreview/>
      <div className="rb-text-field">
        {infoComponent}
      </div>
    </div>
  </>);
};

export default ActualRaceBefore;
