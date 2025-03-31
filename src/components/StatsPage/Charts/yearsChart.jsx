import { Bar } from 'react-chartjs-2';

const YearsChart = ({yearStatsData}) => {

  const years = Object.keys(yearStatsData).reverse();
  const values = Object.values(yearStatsData).reverse();

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Значения',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Цвет столбцов
        borderColor: 'rgba(75, 192, 192, 1)', // Цвет обводки столбцов
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Боковая гистограмма
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // Отключаем подсказки
      },
      legend: {
        display: false,
        position: 'left', // Позиция легенды (можно изменить на 'left', 'right', 'bottom')
      },
      datalabels: {
        display: true,
        align: 'end', // Размещение метки после столбца
        formatter: (value) => value, // Показываем значение в конце каждого столбца
        color: 'black', // Цвет текста
        font: {
          weight: 'bold',
        },
        anchor: 'end', // Привязка метки к концу столбца (чтобы они не накладывались на столбцы)
      },
    },
    scales: {
      x: {
        display: false, // Ось X не отображается
      },
      y: {
        grid: {display: false}, // Отключаем отображение сетки для оси Y
        border: { display: false },
        display: true, // Ось Y не отображается
        labels: years, // Подписи к столбцам
      },
    },
    layout: {
      padding: {
        right: 50,
      },
    },
  };

  return <Bar data={data} options={options} />;

}

export default YearsChart;
