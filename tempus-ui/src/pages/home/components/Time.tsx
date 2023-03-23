import dayjs from 'dayjs';

import { tempusApi } from 'src/redux/api';

import sortKeys from 'src/helpers/sortKeys';

import DayTable from './DayTable';
import TimeAccordion from './TimeAccordion';


const Time = () => {
  const { data: timePerDay, isLoading: timeLoading } = tempusApi.endpoints.getTime.useQueryState();
  const { data: clients, isLoading: clientsLoading } = tempusApi.endpoints.getClients.useQueryState();

  if (timeLoading || clientsLoading) {
    return <h1>Loading</h1>;
  }

  if (!timePerDay || !clients) {
    return <h1>There is no data for some reason</h1>;
  }

  const clientMap = clients.reduce((res, client) => {
    res[client._id] = {
      name: client.name,
      color: client.color,
    };
    return res;
  }, {});

  const weekMap: { [week: string]: { entries: JSX.Element[], totalTime: number , week: string, weekStart: number} } = Object.keys(timePerDay).reduce((res, day) => {
    const week = `${dayjs(day).startOf('week').format('MMM DD')} - ${dayjs(day).endOf('week').format('MMM DD')}`;
    if (!res[week]) {
      res[week] = {
        entries: [],
        totalTime: 0,
        week,
        weekStart: dayjs(day).startOf('week').unix()
      };
    }

    res[week].totalTime += timePerDay[day].length;
    res[week].entries.push(<DayTable key={day} date={day} timeEntries={timePerDay[day]} clientMap={clientMap} />);

    return res;
  }, {});

  const sortedWeeks = sortKeys(weekMap, (a, b) => weekMap[b].weekStart - weekMap[a].weekStart);

  return (
    <div id="time">
      {Object.keys(sortedWeeks).map((week) => (
        <TimeAccordion key={week} totalTime={weekMap[week].totalTime} week={week}>
          {...weekMap[week].entries.sort((a, b) => dayjs(b.props.date).unix() - dayjs(a.props.date).unix())}
        </TimeAccordion>
      ))}
    </div>
  );
};

export default Time;
