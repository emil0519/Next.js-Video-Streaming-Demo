export default function SimpleVideoPlayer() {
  return (
    <div className="flex items-center py-16 flex-col space-y-4">
      <h1 className="text-2xl font-bold">Simple Video Player</h1>
      <video
        controls
        width={800}
        className="rounded shadow-md"
        preload="metadata"
      >
        <source
          src="http://localhost:8000/storage/originals/video.mp4"
          type="video/mp4"
        />
        您的瀏覽器不支援 video 標籤。
      </video>
      <p className="max-w-xl text-center text-white mt-6">
        <strong>影片無法直接跳到遠處播放原因：</strong>伺服器未支援「HTTP
        Range」功能，瀏覽器無法只下載部分影片，所以無法快速跳轉，通常需要額外設定或者是用DASH/HLS轉檔。
        <br />
        <strong>Next.js 影片是否一開始就載入全部？</strong>預設是{" "}
        <code>preload="metadata"</code>
        ，只會載入影片基本資訊，不會完整下載整支影片，節省頻寬。
      </p>
    </div>
  );
}
