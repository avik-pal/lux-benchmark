import styled from "styled-components";

const Wrapper = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.li<{ active: boolean }>`
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(p) =>
    p.active ? "hsl(230deg 20% 75%)" : "hsl(230deg 20% 90%)"};
  color: hsl(240deg 70% 30%);
  font-size: 0.875rem;

  &:hover {
    background-color: hsl(230deg 20% 75%);
  }
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
        <Tag key={x} onClick={() => toggleTag(x)} active={selectedTags.has(x)}>
          {x}
        </Tag>
      ))}
    </Wrapper>
  );
}
