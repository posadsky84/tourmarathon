import React, { useEffect, useState } from 'react';
import './resTable.css';
import { useGetRaceQuery, useGetTeamsQuery } from '../../redux/baseApi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { Link, useParams } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';
import DnsLabel from '../../components/DnsLabel/DnsLabel';
import { resultToStr } from '../../helper';

dayjs.extend(duration);


const ResTable = () => {

    let params = useParams();
    let [selectedDistance, setSelectedDistance] = useState();

    const {
        data: raceData,
        isLoading: raceIsLoading,
        isSuccess: raceIsSuccess,
    } = useGetRaceQuery(params.raceId);

    useEffect(() => {
         if (raceData) setSelectedDistance(raceData.distances.data[0].id);
    }, [raceData]);

    const {
        data: teams,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTeamsQuery(selectedDistance, {skip: !selectedDistance});


    let tabs;
    if (raceIsLoading) {

    } else if (raceIsSuccess) {
        tabs = (<div className="distance-bar">
            {raceData.distances.data.map(item => {
                return (
                  <div
                    className={`distance-item ${item.id === selectedDistance ? 'selected' : ''}`}
                    {...(selectedDistance ? {
                        onClick: () => setSelectedDistance(item.id),
                    } : {})}
                  >
                    {item.attributes.name}
                    </div>
                );
            })}
        </div>);
    }

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
            const runners = item.attributes.members.filter(item => !item.child).sort((a,b) => a.id < b.id ? -1 : 1);
            const runnersChildren = item.attributes.members.filter(item => item.child).sort((a,b) => a.id < b.id ? -1 : 1);
            const cellClass = (!(item.attributes.place % 2) ? 'table-cell odd' : 'table-cell');
            return <>
                <div className={cellClass}>{item.attributes.name}</div>
                <div className={cellClass}>{runners.map(item => {
                  const runner = item.runner.data.attributes;
                  let strRunner = `${runner.lastName ? runner.lastName : ""}`;
                  strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
                  let strInfo = `${runner.year ? " " + runner.year : ""}`;
                    strInfo += `${runner.location ? " " + runner.location : ""}`;
                    return <div className="runner-item">
                        <Link className={`runner-link ${item.dns ? "dns" : ""}`} PreventScrollReset={true} to={`/runners/${item.runner.data.id}`}>{strRunner}</Link>
                        <div className="runner-info">{strInfo}</div>
                        {!!item.dns && <DnsLabel />}
                    </div>;
                })}
                    {(!!runnersChildren.length) && <div>ДЕТИ: </div>}
                    {(!!runnersChildren.length) &&
                      runnersChildren.map(item => {
                        const runner = item.runner.data.attributes;
                        let strRunner = `${runner.lastName ? runner.lastName : ""}`;
                        strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
                        let strInfo = `${runner.year ? " " + runner.year : ""}`;
                        strInfo += `${runner.location ? " " + runner.location : ""}`;
                        return <div>
                            <Link className="runner-link" to={`/runners/${item.runner.data.id}`}>{strRunner}</Link>
                        </div>;
                    })

                }
                </div>
                <div className={cellClass}>{item.attributes.start ? dayjs(item.attributes.start).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className={cellClass}>{item.attributes.finish ? dayjs(item.attributes.finish).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className={cellClass}>{resultToStr(item.attributes.result)}</div>
                <div className={cellClass}>{item.attributes.place}</div>
                <div className={cellClass}><Reward label={item.attributes.comm} /></div>
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
            {tabs}
            <div className="table-row">
                <div className="table-cell table-head-cell">Команда</div>
                <div className="table-cell table-head-cell">Состав</div>
                <div className="table-cell table-head-cell">Старт</div>
                <div className="table-cell table-head-cell">Финиш</div>
                <div className="table-cell table-head-cell">Время</div>
                <div className="table-cell table-head-cell">Место</div>
                <div className="table-cell table-head-cell"></div>
                {runnersContent}
            </div>
        </div>
    );
};

export default ResTable;
