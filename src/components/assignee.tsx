import styled from 'styled-components'

export interface AssigneeProps extends React.ComponentProps<any> {
  name: string
  id: string
  className?: string
}
const Assignee: React.FC<AssigneeProps> = ({
  name,
  id,
  className,
  ...rest
}) => {
  const getInitials = (name: string) => {
    let names = name.split(' ')
    let firstName = names[0]
    let lastName = names[names.length - 1] //Ignore middle names
    let nameInitials = ''
    if (firstName) {
      nameInitials = nameInitials + firstName[0]
    }
    if (lastName) {
      nameInitials = nameInitials + lastName[0]
    }
    return nameInitials.toUpperCase()
  }
  return (
    <div className={className}>
      <div className={!name ? 'no-name' : 'name-assigned'}>
        {name ? (
          <span>{getInitials(name)}</span>
        ) : (
          <span>
            {' '}
            <i className="bi bi-person-plus"></i>{' '}
          </span>
        )}
      </div>
    </div>
  )
}
export default styled(Assignee)`
  float: right;
  display: table;
  .no-name {
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  .name-assigned {
    border: 1px solid #000;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

  span {
    font-size: 10px;
    padding: 0 0 0 3px;
    z-index: 100;
    display: table-cell;
    vertical-align: middle;
  }
  .bi-person-plus {
    color: #ccc;
  }
`
