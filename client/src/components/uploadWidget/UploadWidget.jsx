import { useState, useEffect, useCallback } from "react";

function UploadWidget({ uwConfig, setAvatar }) {
  const [loaded, setLoaded] = useState(false);

  // Load Cloudinary script
  useEffect(() => {
    const loadScript = () => {
      if (!document.getElementById("uw")) {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.id = "uw";
        script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    };

    loadScript();
  }, []);

  // Initialize Cloudinary widget
  const initializeCloudinaryWidget = useCallback(() => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setAvatar(result.info.secure_url);
          }
        }
      );
      myWidget.open();
    } else {
      console.error("Cloudinary script not loaded yet");
    }
  }, [loaded, uwConfig, setAvatar]);

  return (
    <button
      id="upload_widget"
      className="cloudinary-button"
      onClick={initializeCloudinaryWidget}
    >
      Upload
    </button>
  );
}

export default UploadWidget;
