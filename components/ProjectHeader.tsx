import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ProjectInfo {
  name: string;
  url: string;
  mode: "snapshot" | "series";
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export default function ProjectHeader({ name, url, mode }: ProjectInfo) {
  const navigate = useNavigate();
  return (
    <Header>
      <H1>
        <a href={url} target="_blank" rel="noreferrer">
          {name}
        </a>{" "}
      </H1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button
          variant={mode === "snapshot" ? "primary" : "secondary"}
          onClick={() => navigate(`/${name}/`)}
        >
          Snapshot
        </Button>
        <Button
          variant={mode === "snapshot" ? "secondary" : "primary"}
          onClick={() => navigate(`/${name}/series`)}
        >
          Time Series
        </Button>
      </div>
    </Header>
  );
}
