import { Link, useParams } from 'react-router-dom';
import { useGetRunnerQuery } from '../../redux/baseApi';
import './pageRunner.scss';
import PageRunnerDesktop from './PageRunnerDesktop';
import PageRunnerMobile from './PageRunnerMobile';
import Spinner from '../../components/Spinner/Spinner';

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
          <Spinner />
        </div>
      </div>
    )
  } else if (isSuccess) {
    const headerData = runner.data.attributes;
    let teamsData = runner.data.attributes.members.data;

     runnerContent = (<>
         <div className="profile-head">
           <div className="fio-head">{headerData.lastName} {headerData.firstName}</div>
           <div className="profile-line"/>
           <div className="profile-block">
             <div className="profile-block-name">Год рождения:</div>
             <div className="profile-block-data">{headerData.year}</div>
           </div>
           <div className="profile-line"/>
           <div className="profile-block">
             <div className="profile-block-name">Город:</div>
             <div className="profile-block-data">{headerData.location}</div>
           </div>
           <div className="profile-line"/>
           <div className="profile-block">
             <div className="profile-block-name">Кол-во стартов:</div>
             <div className="profile-block-data">надо посчитать</div>
           </div>
           <div className="profile-line"/>
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
