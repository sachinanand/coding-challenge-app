import { now } from 'lodash'
import moment from 'moment'
import { useMemo } from 'react'
import styled from 'styled-components'

export interface DueDateProps extends React.ComponentProps<any> {
  dueDate: string
  className?: string
}
const TaskDueDate: React.FC<DueDateProps> = ({
  dueDate,
  className,
  ...rest
}) => {
  const diffDays = (dueDateStr: string) => {
    const dueDate = moment(dueDateStr, 'YYYY-MM-DD')
    const diff = dueDate.diff(new Date(), 'days')
    return diff
  }
  const isPastDueDate = (dueDateStr: string) => {
    return diffDays(dueDateStr) < 0 ? true : false
  }

  const dueMessage = (dueDateStr: string) => {
    let message = ''
    if (dueDateStr) {
      if (isPastDueDate(dueDateStr)) {
        message = `Due ${Math.abs(diffDays(dueDateStr))} days ago`
      } else {
        message = `Due in ${diffDays(dueDateStr)} days`
      }
    }
    return message
  }

  return (
    <div className={className}>
      <div
        className={
          !dueDate
            ? 'no-due-date'
            : isPastDueDate(dueDate)
            ? 'past-due'
            : 'still-due'
        }
      >
        <i className="bi bi-calendar"></i>
        <div className="message">{dueMessage(dueDate)}</div>
      </div>
    </div>
  )
}
export default styled(TaskDueDate)`
  div {
    float: right;
    font-size: 12px;
    padding: 2px 5px 2px 5px;
    border-radius: 10px;
    margin-left: 7px;
    width: inline-block;
  }
  div.message {
    margin-left: 0;
    padding-left: 4px;
    padding-right: 0;
    float: right;
    font-size: 10px;
    font-weight: 600;
  }
  .past-due {
    background-color: #fff5d1;
    color: #f7cb2a;
    border: 1px solid #f7cb2a;
  }
  .still-due {
    background-color: #fbffe6;
    color: #c5cca3;
    border: 1px solid #c5cca3;
  }
  .no-due-date {
    background-color: #fefefe;
    color: #cccccc;
    border: 1px solid #cccccc;
    text-align: center;
  }
  .no-due-date .bi-calendar {
    margin-left: 3px;
  }
`
