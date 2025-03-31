import { useGetPageAboutQuery } from '../../redux/baseApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import './pageAbout.scss';
import Spinner from '../../components/Spinner/Spinner';
import StatsPage from '../../components/StatsPage/StatsPage';

const PageAbout = () => {

  const {
    data: page,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPageAboutQuery();

  let infoComponent;
  if (isLoading) {
    infoComponent = (<Spinner />);
  } else if (isSuccess) {
    infoComponent = (<div>
        <BlocksRenderer content={page.data.attributes.content} />
        <StatsPage />
      </div>
    );
  } else if (isError) {
    infoComponent = (
      <div>
        Ошибка: {error}
      </div>
    )
  }

  return (
    <div className="content-column">
      <div className="page-about">
        <div>
          {infoComponent}
        </div>
      </div>
    </div>);

};

export default PageAbout;
