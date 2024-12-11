import { Link, useParams } from 'react-router-dom';
import { useGetRunnerQuery } from '../../redux/baseApi';
import './pageRunner.scss';
import PageRunnerDesktop from './PageRunnerDesktop';
import PageRunnerMobile from './PageRunnerMobile';

const PageRunner = () => {

  let params = useParams();

  const {
   data: runner,
    isLoading,
    isSuccess,
    isError,
    error,
   } = useGetRunnerQuery(params.runnerId);

  let runnerContent;
  if (isLoading) {
    runnerContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading nah...</span>
        </div>
      </div>
    )
  } else if (isSuccess) {
    const headerData = runner.data.attributes;
    let teamsData = runner.data.attributes.members.data;

     runnerContent = (<>
         <div className="runner-info-block">
           <div className="runner-info-field">{headerData.lastName} {headerData.firstName} {headerData.midName}</div>
           <div className="runner-info-field">{headerData.year}</div>
           <div className="runner-info-field">{headerData.location}</div>
         </div>
         <div className="runner-teams-desktop">
           <div className="runner-table">
             <div className="runner-table-row">
               <div className="runner-table-cell runner-table-head-cell">Название</div>
               <div className="runner-table-cell runner-table-head-cell">Гонка</div>
               <div className="runner-table-cell runner-table-head-cell">Дистанция</div>
               <div className="runner-table-cell runner-table-head-cell">Состав команды</div>
               <div className="runner-table-cell runner-table-head-cell">Место</div>
               <div className="runner-table-cell runner-table-head-cell"></div>
               <div className="runner-table-cell runner-table-head-cell">Старт</div>
               <div className="runner-table-cell runner-table-head-cell">Финиш</div>
               <div className="runner-table-cell runner-table-head-cell">Время</div>
               <PageRunnerDesktop teamsData={teamsData} runner={runner}/>
             </div>
           </div>
         </div>
         <div className="runner-teams-mobile">
           <PageRunnerMobile teamsData={teamsData} runner={runner}/>
         </div>

       </>
     );


  } else if (isError) {
    runnerContent = (
      <div className="alert alert-danger" role="alert">
              Ошибка: {error}
            </div>
          )
        }


          return (
          <div>
            {runnerContent}
          </div>
          );
          };

          export default PageRunner;
