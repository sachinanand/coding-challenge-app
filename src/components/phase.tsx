import { Accordion, Card, Col, ListGroup, Row } from 'react-bootstrap'
import styled from 'styled-components'
import css from 'classnames'
import { useData } from '../hooks'
import { commonService } from '../services'
import Content from '../components/content'
import TaskItems from './task-items'
import PhaseToggle from './phase-toggle'

export interface PhaseProps extends React.ComponentProps<any> {
  className?: string
}

const Phase: React.FC<PhaseProps> = ({ className }) => {
  const { data, loading } = useData(
    commonService.getEndpointUrl('0103e005-b762-485f-8f7e-722019d4f302')
  )
  return (
    <Content loading={loading} className={className}>
      <Row>
        <Col xs={6}>
          <Accordion>
            {data?.length
              ? data?.map((it: any) => {
                  return (
                    <Card key={it.id}>
                      <Card.Header>
                        <PhaseToggle
                          eventKey={it.id}
                          key={it.id}
                          value={it.name}
                          tasks={it.tasks}
                        ></PhaseToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={it.id}>
                        <TaskItems tasks={it.tasks}></TaskItems>
                      </Accordion.Collapse>
                    </Card>
                  )
                })
              : ''}
          </Accordion>
        </Col>
      </Row>
    </Content>
  )
}
export default styled(Phase)`
  .card-header {
    border-bottom: 0;
    float: left;
  }
  .accordion > .card {
    margin-top: 10px;
  }
`
