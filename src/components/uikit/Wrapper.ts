import styled from 'styled-components'

const Wrapper = styled.div<{ large?: boolean }>`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: ${(props) => (props.large ? '1200px' : '700px')};
`
export default Wrapper
