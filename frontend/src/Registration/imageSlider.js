import React, { useRef } from 'react';
import bg1 from '../images/img1.jpg';
import bg2 from '../images/img2.jpg';
import bg3 from '../images/img3.jpg';
import prevImage from '../images/prev.png';
import nextImage from '../images/next.png';
import "../css/styles.css";


export default function ImageSlider() {
  const imageContainerRef = useRef(null);

  const images = [bg1, bg2, bg3];

  const prev = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollLeft -= 250;
    }
  };

  const next = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollLeft += 250;
      if (imageContainerRef.current.scrollLeft >= imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth) {
        // If scrolled to the end, loop back to the beginning
        imageContainerRef.current.scrollLeft = 0;
      }
    }
  };

  // Define the width and height here
  const sliderWidth = '80%'; // Adjust to your desired width
  const sliderHeight = '200px'; // Adjust to your desired height
  const imageWidth = '100%'; // Adjust to your desired image width
  const imageHeight = '50%'; // Adjust to your desired image height

  return (
    <div className="slider-content" style={{ width: sliderWidth, height: sliderHeight }}>
      <div className="prev" onClick={prev} style={{ backgroundImage: `url(${prevImage})` }}></div>
      <div className="slide-panel" ref={imageContainerRef}>
        {images.map((image, index) => (
          <img
            className="img-slider"
            key={index}
            src={image}
            alt={`Image ${index}`}
            style={{ width: imageWidth, height: imageHeight }}
          />
        ))}
      </div>
      <div className="next" onClick={next} style={{ backgroundImage: `url(${nextImage})` }}></div>
    </div>
  );
}
