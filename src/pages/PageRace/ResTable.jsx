import './resTable.scss';
import { useGetRaceQuery, useGetTeamsQuery } from '../../redux/baseApi';
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
    } = useGetRaceQuery(params.raceId);

    const selectedDistance = raceData?.distances.data.find(item => item.attributes.courseType === selectedCourseType)?.id
                             || (raceData && raceData.distances.data[0].id);

    const {
        data: distanceData,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTeamsQuery(
      {distanceId: selectedDistance,
       returnBadges: raceData?.distances.data.find(item => item.id === selectedDistance).attributes.km === 100,
      },
      {skip: !selectedDistance}
    );


    let tabs;
    let title;
    if (raceIsLoading) {

    } else if (raceIsSuccess) {
        tabs = (<div className="distance-bar">
            {raceData.distances.data.map(item => {
                return (
                  <div
                    className={`distance-item ${item.id === selectedDistance ? 'selected' : ''}`}
                    {...(item.id !== selectedDistance ? {
                        onClick: () => setSearchParams({ distance: item.attributes.courseType}
                        )
                    } : {})}
                  >
                    {item.attributes.name}
                    </div>
                );
            })}
        </div>);


        console.log(raceData);

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
    }

    let runnersContent;
    if (isLoading) {
        runnersContent = (
          <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
              <Spinner />
              </div>
          </div>
        )
    } else if (isSuccess) {


        let rowNum = 0;
        const desktopContent = distanceData.data.attributes.teams.data.map((teamItem) => {
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
        const mobileContent = distanceData.data.attributes.teams.data.map((teamItem) => {
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

    } else if (isError) {
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
