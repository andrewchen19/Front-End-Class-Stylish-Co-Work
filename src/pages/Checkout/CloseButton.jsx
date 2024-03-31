import { useState } from 'react';

const CloseButton = ({ onClose }) => {
  const [isXiconHover, setIsXiconHover] = useState(false);

  return (
    <div
      className="close_button absolute bg-white p-4 w-[50px] h-[50px] right-[25px] top-[20px] flex justify-center items-center hover:cursor-pointer hover:scale-150 transition duration-300 ease-in-out"
      onMouseEnter={() => setIsXiconHover(true)}
      onMouseLeave={() => setIsXiconHover(false)}
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className={isXiconHover ? 'hidden' : 'inline-block'}
      >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className={isXiconHover ? 'inline-block' : 'hidden'}
      >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path
          fill="#8b572a"
          d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
        />
      </svg>
    </div>
  );
};

export default CloseButton;
