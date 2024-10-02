import styled from "styled-components";
import ContextPicker from "./ContextPicker";

interface ContextProps {
  tag?: string;
  branch: string;
  commit: string;
  datetime: string;
  navigate: (s: string) => void;
  tagLookup: Map<string, Benchmark>;
  branchLookup: Map<string, Benchmark[]>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6vw;
`;

export default function ContextNavigator({
  tag,
  branch,
  commit,
  datetime,
  navigate,
  tagLookup,
  branchLookup,
}: ContextProps) {
  const branchSeries = branchLookup.get(branch)!;
  return (
    <Wrapper>
      <ContextPicker
        name="Tag"
        current={tag || ""}
        handler={(t) => t && navigate(`/tag/${t}`)}
        options={Array.from(tagLookup.keys()).concat([""])}
      />
      <ContextPicker
        name="Branch"
        current={branch}
        handler={(b) => navigate(`/branch/${b}`)}
        options={Array.from(branchLookup.keys())}
      />
      <ContextPicker
        name="Commit"
        current={commit}
        handler={(c) => navigate(`/commit/${c}`)}
        options={branchSeries.map((v) => v.commit).reverse()}
        displayOption={(x) => {
          const datetime = branchSeries.find((v) => v.commit == x)!.datetime;
          const local = new Date(datetime + "Z").toLocaleString();
          const short = x.slice(0, 7);
          return `${short} (${local})`;
        }}
      />
    </Wrapper>
  );
}
