import styled from 'styled-components'
import { Task } from '.'

export interface TaskItemsProps extends React.ComponentProps<any> {
  tasks: any[]
  className?: string
}
const TaskItems: React.FC<TaskItemsProps> = ({ tasks, className, ...rest }) => {
  return (
    <div className={className}>
      {tasks.map((it) => {
        return (
          <Task
            key={it.id}
            name={it.name}
            description={it.description}
            relatedLink={it.relatedLink}
            assigneeId={it.assigneeId}
            assigneeName={it.assigneeName}
            dueDate={it.dueDate}
            completed={it.completed}
          ></Task>
        )
      })}
    </div>
  )
}
export default styled(TaskItems)`
  width: 100%;
  padding: 2% 2% 9% 2%;
  background: rgba(0, 0, 0, 0.03);
`
