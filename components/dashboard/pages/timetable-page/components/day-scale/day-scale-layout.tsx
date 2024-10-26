import { BaseView, SchedulerDateTime } from '@devexpress/dx-react-scheduler'

const DayScaleLayout = ({ props }: { props: BaseView.DayScaleLayoutProps }) => {

  const { cellComponent: Cell, rowComponent: Row, cellsData, formatDate, groupedByDate, groupingPanelComponent } = props;

  return (
    <>
      {/* {cellsData.map((data, index) => ( */}
      <Row
      >
        {cellsData.map((data, index) => (
          <Cell
            key={index}
            startDate={new Date(data[index].startDate)}
            endDate={new Date(data[index].endDate)}
            formatDate={function (nextDate: SchedulerDateTime | undefined, nextOptions: Intl.DateTimeFormatOptions): string {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
      </Row>
      {/* ))} */}
    </>
  )
}

export default DayScaleLayout