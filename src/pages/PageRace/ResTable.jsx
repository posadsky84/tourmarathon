import React, { useEffect, useState } from 'react';
import './resTable.css';
import { useGetRaceQuery, useGetTeamsQuery } from '../../redux/baseApi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { Link, useParams } from 'react-router-dom';
import Reward from '../../components/Reward/Reward';
import DnsLabel from '../../components/DnsLabel/DnsLabel';
import { resultToStr } from '../../helper';
import DnfLabel from '../../components/DnfLabel/DnfLabel';

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
        data: distanceData,
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
        let rowNum = 0;
        runnersContent = distanceData.data.attributes.teams.data.map((teamItem) => {
            rowNum++;
            const members = teamItem.attributes.members.data.filter(item => !item.attributes.child).sort((a,b) => a.id < b.id ? -1 : 1);
            const runnersChildren = teamItem.attributes.members.data.filter(item => item.attributes.child).sort((a,b) => a.id < b.id ? -1 : 1);
            const cellClass = (!(rowNum % 2) ? 'table-cell odd' : 'table-cell');
            return <>
                <div className={cellClass}>
                    <div className="cell-item">
                        <div className={teamItem.attributes.dns ? "dns" : ""}>{teamItem.attributes.name}</div>
                        {!!teamItem.attributes.dns && <DnsLabel />}
                        {!!teamItem.attributes.dnf && <DnfLabel />}
                    </div>
                </div>
                <div className={cellClass}>{members.map(memberItem => {
                  const runner = memberItem.attributes.runner.data.attributes;
                  let strRunner = `${runner.lastName ? runner.lastName : ""}`;
                  strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
                  let strInfo = `${runner.year ? " " + runner.year : ""}`;
                    strInfo += `${runner.location ? " " + runner.location : ""}`;
                    return <div className="cell-item">
                        <Link className={`runner-link ${memberItem.attributes.dns || teamItem.attributes.dns ? "dns" : ""}`} PreventScrollReset={true} to={`/runners/${memberItem.attributes.runner.data.id}`}>{strRunner}</Link>
                        <div className="runner-info">{strInfo}</div>
                        {!!memberItem.attributes.dns && <DnsLabel />}
                        {!!memberItem.attributes.dnf && <DnfLabel />}
                    </div>;
                })}
                    {(!!runnersChildren.length) && <div>ДЕТИ: </div>}
                    {(!!runnersChildren.length) &&
                      runnersChildren.map(runnerItem => {
                        const runner = runnerItem.attributes.runner.data.attributes;
                        let strRunner = `${runner.lastName ? runner.lastName : ""}`;
                        strRunner += `${runner.firstName ? " " + runner.firstName : ""}`;
                        let strInfo = `${runner.year ? " " + runner.year : ""}`;
                        strInfo += `${runner.location ? " " + runner.location : ""}`;
                        return <div className="cell-item">
                            <Link className={`runner-link ${runnerItem.attributes.dns || teamItem.attributes.dns ? "dns" : ""}`} to={`/runners/${runnerItem.attributes.runner.data.id}`}>{strRunner}</Link>
                            <div className="runner-info">{strInfo}</div>
                            {!!runnerItem.attributes.dns && <DnsLabel />}
                            {!!runnerItem.attributes.dnf && <DnfLabel />}
                        </div>;
                    })

                }
                </div>
                <div className={cellClass}>{teamItem.attributes.start ? dayjs(teamItem.attributes.start).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className={cellClass}>{teamItem.attributes.finish ? dayjs(teamItem.attributes.finish).format('DD.MM.YYYY HH:mm') : ""}</div>
                <div className={cellClass}>{resultToStr(teamItem.attributes.result)}</div>
                <div className={cellClass}>{teamItem.attributes.place}</div>
                <div className={cellClass}><Reward label={teamItem.attributes.comm} /></div>
            </>
        })
    } else if (isError) {
        runnersContent = (
          <div className="alert alert-danger" role="alert">
              Ошибка: {error}
          </div>
        )
    }



    return (<>
        {tabs}
        <div className="res-table">
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
    </>);
};

export default ResTable;
