import { useGetPageAboutQuery } from '../../redux/baseApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import './pageAbout.scss';
import Spinner from '../../components/Spinner/Spinner';

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
    infoComponent = (<BlocksRenderer content={page.data.attributes.content} />);
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
