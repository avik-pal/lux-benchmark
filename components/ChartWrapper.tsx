import { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 240px;
  flex: 0 1 320px;
`;

export default function ChartWrapper({
  url,
  children,
}: PropsWithChildren<{ url?: string }>) {
  return (
    <Wrapper>
      {children}
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          <Button>View Source</Button>
        </a>
      )}
    </Wrapper>
  );
}
