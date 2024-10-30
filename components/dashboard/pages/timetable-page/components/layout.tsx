import React from 'react'
import { BaseView, CellElementsMeta, SchedulerDateTime } from '@devexpress/dx-react-scheduler'
import DayScaleCell from './day-scale/day-scale-cell';
import DayScaleRow from './day-scale/day-scale-row';
import { TimetableCell } from './timetable/timetable-cell';
import TimetableRow from './timetable/timetable-row';

const Layout = ({ props }: { props: BaseView.LayoutProps }) => {

  const { timeTableComponent: TimeTable, dayScaleComponent: DayScale, setScrollingStrategy } = props;

  return (
    <table className='w-full h-full mt-5'>
      <thead>
        <DayScale
          cellsData={[]}
          cellComponent={(props) => <DayScaleCell props={props} />}
          rowComponent={(props) => <DayScaleRow props={props} />}
          formatDate={function (nextDate: SchedulerDateTime | undefined, nextOptions: Intl.DateTimeFormatOptions): string {
            throw new Error('Function not implemented.');
          }}
        />
      </thead>
      <tbody>
        <TimeTable
          cellsData={[]}
          cellComponent={(props) => <TimetableCell props={props} />}
          rowComponent={(props) => <TimetableRow props={props} />}
          formatDate={function (nextDate: SchedulerDateTime | undefined, nextOptions: Intl.DateTimeFormatOptions): string {
            throw new Error('Function not implemented.');
          }}
          setCellElementsMeta={function (cellElementsMeta: CellElementsMeta): void {
            throw new Error('Function not implemented.');
          }}
        />
      </tbody>
    </table>
  )
}

export default Layout
