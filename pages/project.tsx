import { getBenchmarkData } from "@/utils/data";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import TimeSeriesLayout from "../components/TimeSeriesLayout";

export const loaderDefault: LoaderFunction = async ({ params }) => {
  const { name } = params;
  const data = await getBenchmarkData(name!);
  return { name, series: "main", data };
};

export const loaderSeries: LoaderFunction = async ({ params }) => {
  const { name, series } = params;
  const data = await getBenchmarkData(name!);
  return { name, series, data };
};

export default function Project() {
  const { name, series, data } = useLoaderData() as {
    name: string;
    series: string;
    data: BenchmarkData;
  };
  return <TimeSeriesLayout name={name} series={series} data={data} />;
}
