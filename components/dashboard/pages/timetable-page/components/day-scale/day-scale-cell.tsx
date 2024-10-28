import { BaseView } from '@devexpress/dx-react-scheduler'

const DayScaleCell = ({ props }: { props: BaseView.DayScaleCellProps }) => {

  const { startDate, today, formatDate, endDate, endOfGroup, groupingInfo, hasRightBorder } = props;

  const isToday = today ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700';

  return (
    <th className={`${isToday} h-full w-full text-start justify-center content-center font-semibold`}>
      {new Intl.DateTimeFormat('fr-FR', {weekday: 'short'}).format(new Date(startDate))}
    </th>
  );
}

export default DayScaleCell
