import Link from "next/link";
import { MainWrapper } from "../components/Layout";

export default function Home() {
  return (
    <MainWrapper>
      <h1>Continuous Benchmarking for Julia Projects</h1>
      <ul>
        <li>
          <Link href="/TaylorDiff.jl">TaylorDiff.jl</Link>
        </li>
      </ul>
    </MainWrapper>
  );
}
