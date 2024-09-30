import { Badge } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
`;

export default function TagList({
  tags,
  toggleTag,
  selectedTags,
}: {
  tags: string[];
  toggleTag: (t: string) => void;
  selectedTags: Set<string>;
}) {
  return (
    <Wrapper>
      {tags.map((x) => (
        <Badge key={x} onClick={() => toggleTag(x)} bg={selectedTags.has(x) ? "primary" : "secondary"}>
          {x}
        </Badge>
      ))}
    </Wrapper>
  );
}
