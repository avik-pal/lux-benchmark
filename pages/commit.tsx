import SnapshotLayout from "@/components/SnapshotLayout";
import { getBenchmarkData } from "@/utils/data";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { ChartsLuxLib } from "../configs/LuxLib.jl";

export const loaderHome = (name: string, defaultBranch: string) => {
  const f: LoaderFunction = async () => {
    const data = await getBenchmarkData(name);
    return { name, id: defaultBranch, data };
  };
  return f;
}

export const loaderCommit: LoaderFunction = async ({ params }) => {
  const { name, commit } = params;
  const data = await getBenchmarkData(name!);
  return { name, id: commit, data };
};

export default function Commit() {
  const { name, id, data } = useLoaderData() as {
    name: string;
    id: string;
    data: BenchmarkData;
  };
  return <SnapshotLayout name={name} id={id} data={data} Charts={ChartsLuxLib}/>;
}
