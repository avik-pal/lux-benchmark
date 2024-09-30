import styled from "styled-components";
import { Form } from "react-bootstrap";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 1rem 0;

  & option {
    font-size: 1rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export default function ContextPicker({
  name,
  current,
  handler,
  options,
  displayOption,
}: {
  name: string;
  current: string;
  handler: (s: string) => void;
  options: string[];
  displayOption?: (s: string) => string;
}) {
  return (
    <Wrapper>
      <span>{name}</span>
      <Form.Select
        name="context"
        title={name}
        value={current}
        onChange={(event) => handler(event.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {displayOption ? displayOption(o) : o}
          </option>
        ))}
      </Form.Select>
    </Wrapper>
  );
}
