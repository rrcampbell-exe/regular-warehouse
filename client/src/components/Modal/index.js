import React, { useRef, useEffect } from 'react';

const Modal = () => {

  const regularVideo = document.getElementById("regular-video");

  const modalEl = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      modalEl.current.classList.add("modal-container-visible");
      modalEl.current.classList.remove("modal-container-invisible")
    }, 5000)
    return () => {}
  });

  function removeVideo() {
    regularVideo.classList.remove("regular-video-visible");
    regularVideo.classList.add("regular-video-invisible");
  }
  
  function playVideo() {
    regularVideo.classList.remove("regular-video-invisible");
    regularVideo.classList.add("regular-video-visible");
    regularVideo.requestFullscreen()
    regularVideo.play()
    setTimeout(removeVideo, 65000)
  }

  function closeModal() {
    modalEl.classList.remove("modal-container-visible");
    modalEl.classList.add("modal-container-invisible");
  }

  return (
    <div ref={modalEl} className="modal-container-invisible" id="modal">
      <h3>Is the coast clear? 👀</h3>
      <button onClick={playVideo}>🕺🐈💃</button>
      <button onClick={closeModal}>😓😬😨</button>
    </div>
  )
}

export default Modal;