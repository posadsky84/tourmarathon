import './statsPage.scss';
import { useGetRacesQuery } from '../../redux/baseApi';
import Spinner from '../Spinner/Spinner';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import YearsChart from './Charts/yearsChart';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);



const StatsPage = () => {

  const {
    data: allRaces,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRacesQuery();

  let chartsContent;
  if (isLoading) {
    chartsContent = <Spinner />;
  } else if (isSuccess) {

    const yearStatsData = allRaces.data.reduce((res, item) => {
      const year = item.attributes.ddate.slice(0, 4);
      const cnt = item.attributes.distances.data.reduce((res, item) => {
        return res + item.attributes.runnersStartedCount;
      }, 0);

      return {
        ...res,
        [year]: (res[year] || 0) + cnt
      };

    }, {});

    chartsContent = <YearsChart yearStatsData={yearStatsData}/>;

  } else if (isError) {
    chartsContent = (
      <div className="alert alert-danger" role="alert">
        Ошибка: {error}
      </div>
    )
  }


  return (
    <div>
      {chartsContent}
    </div>
  );
};

export default StatsPage;
