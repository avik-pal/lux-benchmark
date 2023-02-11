import styled from "styled-components";
import ContextPicker from "./ContextPicker";

interface ContextProps {
  tag: string;
  branch: string;
  commit: string;
  setCommit: (s: string) => void;
  tagLookup: Map<string, string>;
  branchLookup: Map<string, BenchmarkUpload[]>;
}

export default function ContextNavigator({
  tag,
  branch,
  commit,
  setCommit,
  tagLookup,
  branchLookup,
}: ContextProps) {
  return (
    <div style={{ display: "flex" }}>
      <ContextPicker
        name="Tag"
        current={tag}
        handler={(t) => t && setCommit(tagLookup.get(t)!)}
      >
        {Array.from(tagLookup.keys())
          .concat([""])
          .map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
      </ContextPicker>
      <ContextPicker
        name="Branch"
        current={branch}
        handler={(b) => setCommit(branchLookup.get(b)![0].context.commit)}
      >
        {Array.from(branchLookup.keys()).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </ContextPicker>
      <ContextPicker name="Commit" current={commit} handler={setCommit}>
        {branchLookup
          .get(branch)!
          .map((v) => v.context.commit)
          .map((s) => (
            <option key={s} value={s}>
              {s.slice(0, 7)}
            </option>
          ))}
      </ContextPicker>
    </div>
  );
}
