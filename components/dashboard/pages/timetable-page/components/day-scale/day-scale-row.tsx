import { BaseView } from '@devexpress/dx-react-scheduler'

const DayScaleRow = ({ props }: { props: BaseView.RowProps }) => {

  const { children } = props;

  return (
    <tr className='flex border-b w-full justify-between'>
      {children}
    </tr>
  )
}

export default DayScaleRow