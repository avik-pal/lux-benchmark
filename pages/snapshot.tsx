import SnapshotLayout from "@/components/SnapshotLayout";
import { getBenchmark } from "@/utils/data";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Charts } from "../configs/TaylorDiff.jl";

export const loaderSnapshot: LoaderFunction = async ({ params }) => {
  const { name, ...rest } = params;
  const data = await getBenchmark(name!);
  return { name, data, ...rest };
};

type LoaderData = {
  name: string;
  data: Benchmark[];
} & SnapshotSpecifier;

export default function Commit() {
  const loaderData = useLoaderData() as LoaderData;
  const { name, data, ...specifier } = loaderData;
  return <SnapshotLayout name={name} specifier={specifier} data={data} Charts={Charts} />;
}
