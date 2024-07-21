import React, { useState } from 'react';
import images from "../Images/index";
import Image from 'next/image';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = [
    images.f,
    images.s,
    images.o,
    images.t,
    images.th,
    images.fo
  ]; // List your image filenames here

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === slideImages.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? slideImages.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slideshow-container">
      <div className="slide">
        <Image
          src={slideImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
      <style jsx>{`
        .slideshow-container {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        slide {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            position: relative;
          }
        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          outline: none;
          cursor: pointer;
          padding: 1px;
          z-index: 1; /* Ensure buttons appear on top of the image */
        }
        .prev {
          left: 10px;
        }
        .next {
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Slideshow;
