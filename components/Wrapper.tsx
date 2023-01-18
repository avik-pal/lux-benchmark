import { PropsWithChildren } from "react";

export function Wrapper({ url, children }: PropsWithChildren<{url: string}>) {
  return <div className='chart-container'>
    { children }
    <a href={url} target='_blank'>
      <div className='button'>View Source</div>
    </a>
  </div>
}
