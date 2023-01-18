import Link from 'next/link';
import Head from '@/components/Head';

export default function Home() {
  return (
    <>
      <Head title='Continuous Benchmarking for Julia Projects' />
      <main>
        <h1>Continuous Benchmarking for Julia Projects</h1>
        <ul>
          <li><Link href="/TaylorDiff.jl">TaylorDiff.jl</Link></li>
        </ul>
      </main>
    </>
  )
}
