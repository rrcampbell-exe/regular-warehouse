import React from "react";

const Footer = () => {
  const regularVideo = document.getElementById("regular-video");

  function removeVideo() {
    regularVideo.classList.remove("regular-video-visible");
    regularVideo.classList.add("regular-video-invisible");
  }
  
  function playVideo() {
    regularVideo.classList.remove("regular-video-invisible");
    regularVideo.classList.add("regular-video-visible");
    regularVideo.requestFullscreen()
    regularVideo.play()
    setTimeout(removeVideo, 66000)
  }

  return (
    <footer>
      <span onClick={playVideo}>
        Nothing extraordinary will happen if you click here.
      </span>
    </footer>
  );
};

export default Footer;
