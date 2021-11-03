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
    }, 30000)
    return () => {}
  });

  function removeVideo() {
    regularVideo.classList.remove("regular-video-visible");
    regularVideo.classList.add("regular-video-invisible");
    document.exitFullscreen();
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
    <div ref={modalEl} className="modal-container-invisible container" id="modal">
      
      <div className="col-6 modal-text">
        <h3 className="text-center">Is the coast clear? 👀</h3>
        <div className="d-flex flex-row justify-content-around">
          <button className='btn btn-outline-secondary' onClick={playVideo}><span className="material-icons align-bottom">
check
</span></button>
          <button className='btn btn-outline-secondary' onClick={closeModal}><span className="material-icons align-bottom">
block
</span></button>
        </div>
        <span className="text-center">If <span className="material-icons align-bottom">
check
</span>, there may be some flashing lights.</span>
      </div>
      <div className="col-6 cat-container">
        <img alt="A grayish brown cat peeks around a corner" className="secret-cat" src="./assets/creeping-cat.png"/>
      </div>
    </div>
  )
}

export default Modal;