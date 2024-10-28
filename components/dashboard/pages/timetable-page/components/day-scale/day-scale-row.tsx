import { BaseView } from '@devexpress/dx-react-scheduler'

const DayScaleRow = ({ props }: { props: BaseView.RowProps }) => {

  const { children } = props;

  return (
    <tr className="flex w-full border-b">
      {children}
    </tr>
  )
}

export default DayScaleRow
