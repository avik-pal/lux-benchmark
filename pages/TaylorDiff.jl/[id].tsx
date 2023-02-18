import { useRouter } from "next/router";
import SnapshotLayout from "@/components/SnapshotLayout";
import { Charts } from "./";

export default function Page() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return (
    <SnapshotLayout
      name="TaylorDiff.jl"
      id={id}
      Charts={Charts}
    />
  );
}
