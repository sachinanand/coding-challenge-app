import { useAccordionButton } from 'react-bootstrap'
import styled from 'styled-components'

export interface PhaseToggleProps extends React.ComponentProps<any> {
  eventKey: string
  value: string
  tasks: any[]
  className?: string
}
const PhaseToggle: React.FC<PhaseToggleProps> = ({
  eventKey,
  value,
  className,
  tasks,
  ...rest
}) => {
  const completedTasksMessage = (tasks: any) => {
    return `${
      tasks.filter((it: any) => {
        return it.completed
      }).length
    }/${tasks.length}`
  }
  return (
    <div className={className}>
      <div className="icon">
        <i
          className="bi bi-caret-up"
          onClick={useAccordionButton(eventKey)}
        ></i>
      </div>
      <div className="phase-icon">
        <i className="bi bi-file-earmark"></i>
      </div>
      <div className="title">{value}</div>
      <div className="completion-score">{completedTasksMessage(tasks)}</div>
    </div>
  )
}
export default styled(PhaseToggle)`
  .icon {
    float: right;
    margin-right: 20px;
  }
  .title {
    float: left;
    font-family: 'arial';
    font-weight: 800;
    font-size: 24px;
  }
  .completion-score {
    float: left;
    padding: 6px 0 0 15px;
    color: #aaa;
  }
  .phase-icon {
    float: left;
    margin: 5px 10px 0 0;
  }
`
