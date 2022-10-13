import { useEffect, useState } from "react";
import { generateQRImageDataURL, getUserLink } from "../lib/background";

import styles from "./backgroundRenderer.module.css";

export default function BackgroundRenderer({
  profile,
  background,
  uploader,
  qrSize = 150,
}) {
  const [qrcodeURL, setQrcodeURL] = useState("");

  async function getQRCodeURL(userProfile) {
    const url = await generateQRImageDataURL({
      profile: userProfile,
      qrSize,
      qrSize,
    });
    setQrcodeURL(url);
  }

  useEffect(() => {
    if (profile) getQRCodeURL(profile);
  }, [profile]);

  return (
    <div
      className={`relative w-full h-full  ${
        background
          ? "bg-center bg-cover bg-no-repeat"
          : styles["topography-background"]
      }`}
      style={{
        minHeight: "600px",
        backgroundImage: background ? `url("${background}")` : "",
      }}
    >
      <div
        className={`w-full py-2 py-4 text-3xl font-bold text-center bg-gray-100`}
      >
        {uploader
          ? `Current background set by ${uploader}`
          : `Scan the code below to set ${
              profile.firstName ? `${profile.firstName}'s` : "my"
            } background!`}
      </div>
      <div className="absolute z-20 flex flex-col items-center justify-center p-2 rounded-lg shadow-sm bg-gray-100/50 bottom-5 left-5">
        <div className="mb-2 text-2xl font-bold text-center">
          Set my background!
        </div>
        {qrcodeURL && <img src={qrcodeURL} width={qrSize} height={qrSize} />}
      </div>
    </div>
  );
}
