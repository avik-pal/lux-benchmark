import styled from "styled-components";
import { PropsWithChildren } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 1rem 0;

  & option {
    font-size: 1rem;
  }
`;

export default function ContextPicker({
  name,
  current,
  handler,
  options,
  displayOption,
  children,
}: PropsWithChildren<{
  name: string;
  current: string;
  handler: (s: string) => void;
  options: string[];
  displayOption?: (s: string) => string;
}>) {
  return (
    <Wrapper>
      <span>{name}</span>
      <select
        name={name}
        value={current}
        onChange={(event) => handler(event.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {displayOption ? displayOption(o) : o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
