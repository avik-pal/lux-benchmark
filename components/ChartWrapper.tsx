import { PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  @media (max-width: 720px) {
    margin: 1.5rem auto;
    width: 90%;
  }

  @media (min-width: 720px) {
    margin: 2rem;
    width: 40%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SourceViewer = styled.button`
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
}: PropsWithChildren<{ url: string }>) {
  return (
    <Wrapper>
      {children}
      <a href={url} target="_blank" rel="noreferrer">
        <SourceViewer className="button">View Source</SourceViewer>
      </a>
    </Wrapper>
  );
}
