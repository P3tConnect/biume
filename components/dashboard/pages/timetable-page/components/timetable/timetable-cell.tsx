import { MonthView, BaseView } from "@devexpress/dx-react-scheduler";

export const TimetableCell = ({ props }: { props: BaseView.TimeTableCellProps }) => {

  const { startDate, children, onDoubleClick, endDate } = props;

  return (
    <td className="w-full flex flex-col bg-gray-300 border border-slate-700">
      <p className="text-black">{startDate?.getDate()}</p>
      {children}
    </td>
  );
};