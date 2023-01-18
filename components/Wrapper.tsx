import { PropsWithChildren } from "react";

export function Wrapper({ url, children }: PropsWithChildren<{url: string}>) {
  return <div className='chart-container'>
    { children }
    <a href={url} target='_blank' rel='noreferrer'>
      <div className='button'>View Source</div>
    </a>
  </div>
}
