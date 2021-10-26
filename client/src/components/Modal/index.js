import React, { useRef, useEffect, useState } from 'react';

const Modal = () => {

  const regularVideo = document.getElementById("regular-video");

  const modalEl = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false);

  // opens modal after visitor has been on page for X amount of time
  useEffect(() => {
    setTimeout(() => {
      modalEl.current.classList.add("modal-container-visible");
      modalEl.current.classList.remove("modal-container-invisible")
      setIsModalOpen(isModalOpen)
    }, 5000)
    return () => {}
  });

  function removeVideo() {
    regularVideo.classList.remove("regular-video-visible");
    regularVideo.classList.add("regular-video-invisible");
  }

  function closeModal() {
    setIsModalOpen(!isModalOpen)
    modalEl.current.classList.add("modal-container-invisible");
    modalEl.current.classList.remove("modal-container-visible");
  }
  
  function playVideo() {
    regularVideo.classList.remove("regular-video-invisible");
    regularVideo.classList.add("regular-video-visible");
    regularVideo.requestFullscreen()
    regularVideo.play()
    setTimeout(removeVideo, 65000)
    closeModal()
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