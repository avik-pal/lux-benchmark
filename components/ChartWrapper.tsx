import { PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  min-width: 300px;
  flex: 0 1 400px;

  @media (max-width: 500px) {
    margin: 1rem;
  }
`;

const SourceViewer = styled.button`
  font-size: 1rem;
  box-shadow: none;
  background-color: cornflowerblue;
  border-radius: 0.5rem;
  color: white;
  padding: 0.7rem 1rem;
  margin: 1rem;
  text-decoration: none;

  &:hover {
    color: #ddf;
  }
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
          <SourceViewer>View Source</SourceViewer>
        </a>
      )}
    </Wrapper>
  );
}
