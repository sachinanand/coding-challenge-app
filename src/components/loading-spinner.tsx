import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const LoadingSpinner = styled((props) => {
  return (
    <div {...props}>
      <Spinner animation="border" variant="primary" />
    </div>
  )
})`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`

export default LoadingSpinner
