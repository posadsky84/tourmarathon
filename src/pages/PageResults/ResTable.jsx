import React from 'react';
import './resTable.css';
import { useGetTeamsQuery } from '../../redux/baseApi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { Link } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';

dayjs.extend(duration);


const ResTable = () => {

    const {
        data: teams,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTeamsQuery();

    let runnersContent;
    if (isLoading) {
        runnersContent = (
          <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading nah...</span>
              </div>
          </div>
        )
    } else if (isSuccess) {
        runnersContent = teams.data.map((item) => {
            return <>
                <div className="table-cell">{item.attributes.place}</div>
                <div className="table-cell">{item.attributes.name}</div>
                <div className="table-cell">{item.attributes.runners.data.map(item => {
                  let strRunner = `${item.attributes.lastName ? item.attributes.lastName : ""}`;
                  strRunner += `${item.attributes.firstName ? " " + item.attributes.firstName : ""}`;
                  let strInfo = `${item.attributes.year ? " " + item.attributes.year : ""}`;
                    strInfo += `${item.attributes.location ? " " + item.attributes.location : ""}`;
                    return <div>
                        <Link to={`runners/${item.id}`}>{strRunner}</Link>
                    </div>;
                })}
                    {(!!item.attributes.runnersChildren.data.length) && <div>ДЕТИ: </div>}
                    {(!!item.attributes.runnersChildren.data.length) &&
                    item.attributes.runnersChildren.data.map(item => {
                        let strRunner = `${item.attributes.lastName ? item.attributes.lastName : ""}`;
                        strRunner += `${item.attributes.firstName ? " " + item.attributes.firstName : ""}`;
                        let strInfo = `${item.attributes.year ? " " + item.attributes.year : ""}`;
                        strInfo += `${item.attributes.location ? " " + item.attributes.location : ""}`;
                        return <div>
                            <Link to={`runners/${item.id}`}>{strRunner}</Link>
                        </div>;
                    })

                }
                </div>
                <div className="table-cell">{item.attributes.start ? dayjs(item.attributes.start).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className="table-cell">{item.attributes.finish ? dayjs(item.attributes.finish).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className="table-cell">{item.attributes.finish ? dayjs.duration(dayjs(item.attributes.finish).diff(dayjs(item.attributes.start))).format('HH:mm'): ""}</div>
                <div className="table-cell"><Reward label={item.attributes.comm} /></div>
            </>
        })
    } else if (isError) {
        runnersContent = (
          <div className="alert alert-danger" role="alert">
              Ошибка: {error}
          </div>
        )
    }



    return (
        <div className="res-table">
            <div className="table-row">
                <div className="table-cell table-head-cell">№</div>
                <div className="table-cell table-head-cell">Название</div>
                <div className="table-cell table-head-cell">Состав</div>
                <div className="table-cell table-head-cell">Старт</div>
                <div className="table-cell table-head-cell">Финиш</div>
                <div className="table-cell table-head-cell">Время</div>
                <div className="table-cell table-head-cell">Прим.</div>
                {runnersContent}
            </div>
        </div>
    );
};

export default ResTable;
