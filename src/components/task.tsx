import { Card } from 'react-bootstrap'
import styled from 'styled-components'
import { Assignee, TaskDueDate } from '.'

export interface TaskProps extends React.ComponentProps<any> {
  name: string
  description: string
  relatedLink: string
  assigneeId: string
  assigneeName: string
  dueDate: string
  completed: boolean
  className?: string
}

const Task: React.FC<TaskProps> = ({
  name,
  description,
  relatedLink,
  assigneeId,
  assigneeName,
  dueDate,
  completed,
  className,
  ...rest
}) => {
  const trim = (str: string) => {
    let allowedLength = 26
    return str.length >= allowedLength
      ? str.substring(0, allowedLength) + '...'
      : str
  }
  return (
    <div className={className}>
      <div className="vertical-line-container">
        {completed ? (
          <img src="assets/icon/ok.png" height="20" width="20" />
        ) : (
          <i className="bi bi-square"></i>
        )}

        <div className="vertical-line"></div>
      </div>
      <Card {...rest}>
        <Card.Body>
          <TaskDueDate dueDate={dueDate}></TaskDueDate>
          <Assignee name={assigneeName} id={assigneeId}></Assignee>
          <Card.Title>{name}</Card.Title>
          {description ? (
            <Card.Subtitle className="mb-2 text-muted">
              {description}
            </Card.Subtitle>
          ) : (
            ''
          )}
          {relatedLink ? (
            <div className="div-card-link">
              <div className="icon">
                <i className="bi bi-box-arrow-up-right"></i>
              </div>
              <Card.Link href="#">{trim(relatedLink)}</Card.Link>
            </div>
          ) : (
            ''
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
export default styled(Task)`
  .card {
    margin: 20px 0 20px 0;
    border-radius: 10px;
    text-align: left;
  }

  .card-title {
    font-family: 'arial';
    font-weight: bold;
  }
  .card-subtitle {
    margin: 5px 0 5 px 0;
    border-radius: 10px;
    text-align: left;
    font-size: 12px;
    color: #000 !important;
  }
  .card-body{
	  padding: 5px 2px 5px 10px;
  }
  .div-card-link {
    background-color: #edf8fa;
    padding: 2px 10px 2px 10px;
    border-radius: 7px;
    display: inline-block;
    font-size: 12px;
    color: #778587;
  }
  .div-card-link a.card-link {
    color: #778587;
  }
  .icon {
    float: left;
    margin: 0 5px 0 0;
  }
  .vertical-line {
    border-left: 2px solid #000000;
    height: 79px;
    margin: 0 0 0 9px;
	padding 0;
  }
  .vertical-line-container {
    float: left;
    margin-right: 15px;
	padding-left: 8px
  }
  .bi-square {
	  margin: 0;
	  padding: 0;
	  font-size: 18px;
  }
  .bi-check-square {
	  font-size: 18px;
  }
`
