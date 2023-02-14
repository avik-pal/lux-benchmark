import styled from "styled-components";
import ContextPicker from "./ContextPicker";

interface ContextProps {
  tag: string;
  branch: string;
  commit: string;
  setCommit: (s: string) => void;
  tagLookup: Map<string, BenchmarkUpload>;
  branchLookup: Map<string, BenchmarkUpload[]>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4vw;
`;

export default function ContextNavigator({
  tag,
  branch,
  commit,
  setCommit,
  tagLookup,
  branchLookup,
}: ContextProps) {
  return (
    <Wrapper>
      <ContextPicker
        name="Tag"
        current={tag}
        handler={(t) => t && setCommit(tagLookup.get(t)!.context.commit)}
        options={Array.from(tagLookup.keys()).concat([""])}
      />
      <ContextPicker
        name="Branch"
        current={branch}
        handler={(b) => setCommit(branchLookup.get(b)![0].context.commit)}
        options={Array.from(branchLookup.keys())}
      />
      <ContextPicker
        name="Commit"
        current={commit}
        handler={setCommit}
        options={branchLookup.get(branch)!.map((v) => v.context.commit)}
        displayOption={(x) => x.slice(0, 7)}
      />
    </Wrapper>
  );
}
