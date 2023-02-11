import styled from "styled-components";

interface ProjectInfo {
  name: string;
  url: string;
}

export default function ProjectHeader({ name, url }: ProjectInfo) {
  return (
    <header>
      <h1 style={{ textAlign: "center" }}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>{" "}
        Benchmarks
      </h1>
    </header>
  );
}
