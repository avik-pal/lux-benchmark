import { useRouter } from "next/router";
import TimeSeriesLayout from "../../../components/TimeSeriesLayout";

export default function Page() {
  const router = useRouter();
  const { name } = router.query as { name: string };
  const defaultSeries = 'main';
  return (
    <TimeSeriesLayout
      name={name}
      series={defaultSeries}
    />
  );
}
