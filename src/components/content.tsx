import React, { useState, useRef, useImperativeHandle } from 'react'
import LoadingSpinner from './loading-spinner'
import styled from 'styled-components'
import css from 'classnames'
import { Container } from 'react-bootstrap'

export interface ContentProps extends React.ComponentProps<typeof Container> {
  loading?: boolean
  noScrollIndicator?: boolean
}

const Content: React.ForwardRefRenderFunction<any, ContentProps> = (
  { loading, noScrollIndicator, children, ...rest },
  ref
) => {
  const content = useRef<any>()
  const [isScrolled, setIsScrolled] = useState(false)

  useImperativeHandle(ref, () => content.current)

  return (
    <Container ref={content} {...rest}>
      <div slot="fixed" className={css('gradient', { scrolled: isScrolled })} />
      {loading ? <LoadingSpinner /> : children}
    </Container>
  )
}

export default styled(React.forwardRef(Content))`
  position: relative;
  .gradient {
    background: linear-gradient(
      180deg,
      rgba(2, 0, 36, 0.15) 0%,
      rgba(0, 212, 255, 0) 100%
    );
    border-top: solid 1px rgb(var(--ion-color-medium-rgb), 0.2);
    transition: all linear 0.1s;
    height: 20px;
    pointer-events: none;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;

    &.scrolled {
      opacity: 1;
    }
  }
`
