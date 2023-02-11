import styled from "styled-components";
import { PropsWithChildren } from "react";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & select {
    margin: 1rem;
  }

  & option {
    font-size: 1rem;
  }
`;

export default function ContextPicker({
  name,
  current,
  handler,
  children,
}: PropsWithChildren<{
  name: string;
  current: string;
  handler: (s: string) => void;
}>) {
  return (
    <Wrapper>
      <span>{name}</span>
      <select
        name={name}
        value={current}
        onChange={(event) => handler(event.target.value)}
      >
        {children}
      </select>
    </Wrapper>
  );
}
