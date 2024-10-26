import { BaseView } from '@devexpress/dx-react-scheduler'

const DayScaleCell = ({ props }: { props: BaseView.DayScaleCellProps }) => {

  const { startDate, today, formatDate, endDate, endOfGroup, groupingInfo, hasRightBorder } = props;

  const isToday = today ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black';

  return (
    <th className={`${isToday} text-start font-semibold w-full`}>
      {new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(new Date(startDate))}
    </th>
  );
}

export default DayScaleCell