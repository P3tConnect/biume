import { BaseView } from "@devexpress/dx-react-scheduler";

export const TimetableCell = ({props}: { props: BaseView.TimeTableCellProps }) => {

  const {startDate, children, onDoubleClick, endDate} = props;

  return (
      <td className="relative bg-gray-100 border border-gray-300 h-24 w-full">
        <div className="absolute top-1 left-1 text-xs text-gray-600">{startDate?.getDate()}</div>
      </td>
  );
};
