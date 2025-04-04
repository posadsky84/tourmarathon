import './resTable.scss';
import { useGetTeamsQuery } from '../../redux/baseApi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { useParams, useSearchParams } from 'react-router-dom';
import { getStrapiImageUrl, toFineDateLong } from '../../helper';
import ResTableDesktop from './ResTableDesktop';
import ResTableMobile from './ResTableMobile';
import Spinner from '../../components/Spinner/Spinner';

dayjs.extend(duration);

const ResTable = () => {

    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCourseType = searchParams.get('distance');

    const {
        data: raceData,
        isLoading: raceIsLoading,
        isSuccess: raceIsSuccess,
        isError: raceIsError,
        error,
    } = useGetTeamsQuery(params.raceId);

    let tabs;
    let title;
    let runnersContent;
    if (raceIsLoading) {
        runnersContent = (
          <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
              <Spinner />
              </div>
          </div>
        )
    } else if (raceIsSuccess) {

        const selectedDistance =
          (selectedCourseType &&
            raceData?.distances.data.findIndex(item => item.attributes.courseType === selectedCourseType)
          ) || 0;

        tabs = (<div className="distance-bar">
            {raceData.distances.data.map((item, index) => {
                return (
                  <div
                    className={`distance-item ${index === selectedDistance ? 'selected' : ''}`}
                    {...(index !== selectedDistance ? {
                        onClick: () => setSearchParams({ distance: item.attributes.courseType}
                        )
                    } : {})}
                  >
                      {item.attributes.name}
                  </div>
                );
            })}
        </div>);

        title = (<div className="res-head">
            <div className="res-magnet-place">
                <img className="race-magnet-image" alt=""
                     src={getStrapiImageUrl(raceData.magnet.data?.attributes.url)}></img>
            </div>
            <div className="res-title">
                <div className="res-title-name">{raceData.name}</div>
                <div className="res-title-info">{toFineDateLong(new Date(raceData.ddate))}, {raceData.location}</div>
            </div>
        </div>);


        let rowNum = 0;
        const desktopContent = raceData.distances.data[selectedDistance].attributes.teams.data.map((teamItem) => {
            rowNum++;
            const members = teamItem.attributes.members.data.filter(item => !item.attributes.child).sort((a, b) => a.id < b.id ? -1 : 1);
            const runnersChildren = teamItem.attributes.members.data.filter(item => item.attributes.child).sort((a, b) => a.id < b.id ? -1 : 1);

            return <ResTableDesktop
              teamItem={teamItem}
              members={members}
              runnersChildren={runnersChildren}
              params={params}
              rowNum={rowNum}/>;

        });

        rowNum = 0;
        const mobileContent = raceData.distances.data[selectedDistance].attributes.teams.data.map((teamItem) => {
            rowNum++;
            const members = teamItem.attributes.members.data.filter(item => !item.attributes.child).sort((a, b) => a.id < b.id ? -1 : 1);
            const runnersChildren = teamItem.attributes.members.data.filter(item => item.attributes.child).sort((a, b) => a.id < b.id ? -1 : 1);

            return <ResTableMobile
              teamItem={teamItem}
              members={members}
              runnersChildren={runnersChildren}
              params={params}
              rowNum={rowNum}/>;

        });


        runnersContent = (<>
        <div className="res-table-desktop">
            <div className="table-row">
                <div className="table-cell table-head-cell">Команда</div>
                <div className="table-cell table-head-cell">Участники</div>
                <div className="table-cell table-head-cell">Старт</div>
                <div className="table-cell table-head-cell">Финиш</div>
                <div className="table-cell table-head-cell">Время</div>
                <div className="table-cell table-head-cell">Место</div>
                <div className="table-cell table-head-cell"></div>
                <div className="table-cell table-head-cell"></div>
                {desktopContent}
            </div>
        </div>
        <div className="res-table-mobile">
            {mobileContent}
        </div>
        </>);

    } else if (raceIsError) {
        runnersContent = (
          <div className="alert alert-danger" role="alert">
              Ошибка: {error}
          </div>
        )
    }


    return (<>
        {title}
        {tabs}
        {runnersContent}
    </>);
};

export default ResTable;
