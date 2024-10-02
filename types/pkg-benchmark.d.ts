interface TrialEstimate {
  name: string;
  time: number;
  memory: number;
  allocs: number;
  params: Record<string, number>;
}

interface BenchmarkGroup {
  name: string;
  tags: string[];
  data: (TrialEstimate | BenchmarkGroup)[];
}

interface G0 {
  tags: string[];
  data: TrialEstimate[];
}

interface G1 {
  tags: string[];
  data: G0[];
}

interface G2 {
  tags: string[];
  data: G1[];
}

interface Benchmark {
  datetime: string;
  commit: string;
  branch: string;
  tag?: string;
  config: Record<string, unknown>;
  result: BenchmarkGroup[];
}

type BenchmarkContext = Pick<Benchmark, "branch" | "commit" | "tag" | "datetime">;

type SnapshotSpecifier = {} | { branch: string } | { commit: string } | { tag: string };
