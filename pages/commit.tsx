import SnapshotLayout from "@/components/SnapshotLayout";
import { getBenchmark } from "@/utils/data";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Charts } from "../configs/TaylorDiff.jl";

export const loaderHome = (name: string, defaultBranch: string) => {
  const f: LoaderFunction = async () => {
    const data = await getBenchmark(name);
    return { name, id: defaultBranch, data };
  };
  return f;
}

export const loaderCommit: LoaderFunction = async ({ params }) => {
  const { name, commit } = params;
  const data = await getBenchmark(name!);
  return { name, id: commit, data };
};

export default function Commit() {
  const { name, id, data } = useLoaderData() as {
    name: string;
    id: string;
    data: Benchmark[];
  };
  return <SnapshotLayout name={name} id={id} data={data} Charts={Charts}/>;
}
