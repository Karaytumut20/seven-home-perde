import { pages } from "@/content/pages";

export default function Loading() {
  return <main className="route-loading" id="icerik" aria-busy="true"><span className="micro">SEVEN HOME</span><p role="status">{pages.loader.waiting}</p><span className="loading-thread" aria-hidden="true" /></main>;
}
