import { useRouter } from "next/router";
import TimeSeriesLayout from "../../../components/TimeSeriesLayout";

export default function Page() {
  const router = useRouter();
  const { name, series } = router.query as { name: string, series: string };
  return (
    <TimeSeriesLayout
      name={name}
      series={series}
    />
  );
}
