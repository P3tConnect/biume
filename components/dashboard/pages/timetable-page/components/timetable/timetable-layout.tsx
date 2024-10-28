import { BaseView, MonthView, SchedulerDateTime } from '@devexpress/dx-react-scheduler'

const TimeTableLayout = ({ props }: { props: MonthView.TimeTableLayoutProps }) => {

  const { cellComponent: TimeTableCell, rowComponent: TimeTableRow, setCellElementsMeta, cellsData, formatDate } = props;

  return (
    <>
      {cellsData.map((data, index) => (
        <TimeTableRow
          key={index}
        >
          {data.map((data, index) => (
            <TimeTableCell
              key={index}
              startDate={new Date(data.startDate)}
              endDate={new Date(data.endDate)}
              formatDate={function (nextDate: SchedulerDateTime | undefined, nextOptions: Intl.DateTimeFormatOptions): string {
                throw new Error('Function not implemented.');
              }}
            />
          ))}
        </TimeTableRow>
      ))}
    </>
  );
}

export default TimeTableLayout