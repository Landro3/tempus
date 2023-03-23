import dayjs from 'dayjs';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { TimeEntry } from 'src/types/TimeEntry';

import getDuration from 'src/helpers/getDuration';

import ClientColor from 'src/components/ClientColor';

type DayTableProps = {
  date: string;
  timeEntries: TimeEntry[];
  clientMap: Record<string, { name: string, color: string}>
}

const DayTable = (props: DayTableProps) => {
  const { date, timeEntries, clientMap } = props;

  const totalTime = timeEntries.reduce((total, entry) => total += entry.length, 0);

  return (
    <div className="day">
      <table>
        <thead>
          <tr className="header">
            <th colSpan={2}>
              <span>{dayjs(date).format('MMM D, YYYY')}</span>
            </th>
            <th></th>
            <th>
              <div>
                <AiOutlineClockCircle fontSize="1.5rem" />
              </div>
            </th>
            <th>
              <span>{getDuration(totalTime)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {timeEntries.map((t, i) => (
            <tr key={i}>
              <td>
                <ClientColor color={clientMap[t.clientId].color} />
              </td>
              <td>
                <span>{clientMap[t.clientId].name}</span>
              </td>
              <td>
                <span>{t.description}</span>
              </td>
              <td></td>
              <td>
                <span>{getDuration(t.length)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayTable;