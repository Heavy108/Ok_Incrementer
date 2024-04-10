import React, { useState } from 'react';


const Modal = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState('');

  const handleButtonClick = (buttonId) => {
    setIsActive(true);
    setActiveButtonId(buttonId);
  };

  const handleModalClick = () => {
    setIsActive(false);
    setActiveButtonId('');
  };

  return (
    <div className={`modal-container ${isActive ? activeButtonId : ''}`}>
      <div className="modal-background" onClick={handleModalClick}>
        <div className="modal">
          <h2>I'm a Modal</h2>
          <p>Hear me roar.</p>
        </div>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="content">
      <h1>Modal Animations</h1>
      <div className="buttons">
        <button id="six" className="button" onClick={() => handleButtonClick('six')}>
          Sketch
        </button>
      </div>
    </div>
  );
};

const Display = () => {
  return (
    <div>
      <Content />
      <Modal />
    </div>
  );
};

export default Display;
