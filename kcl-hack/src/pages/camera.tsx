import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Link from "next/link";
import Header from "../components/header";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export const Camera = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <main>
      <Header children="CAMERA" />
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>開始</button>
      )}
      {isCaptureEnable && (
        <main>
          <div>
            <button onClick={() => setCaptureEnable(false)}>終了</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>キャプチャ</button>
        </main>
      )}
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl(null);
              }}
            >
              削除
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </main>
  );
};

export default Camera;
