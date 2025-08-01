import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center py-16 flex-col space-y-4">
      <h1 className="text-2xl font-bold">Video Streaming Demo</h1>
      <Link href="/simple-video-player">Simple Video Player</Link>
    </div>
  );
}
