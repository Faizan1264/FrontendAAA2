
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Banner.css';

const Banner = () => {
  const images = [
    {
      url: "https://img.freepik.com/free-photo/aerial-view-cargo-ship-cargo-container-harbor_335224-1370.jpg?ga=GA1.1.971227774.1741677090&semt=ais_hybrid&w=740",
      heading: "AAA 2 Innovate Pvt Ltd",
      caption: "It's not a company but a concept."
    },
    {
      url: "https://img.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-735.jpg?t=st=1744201361~exp=1744204961~hmac=8e657cd066245d1312d6065b99be7f6bc85a2a53b89a53c0e6ac3f043f761d88&w=996",
      heading: "About Zipaworld",
      caption: "Zipaworld is a leading logistics company providing all the solutions related to logistics services."
    },
    {
      url: "https://img.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-719.jpg?t=st=1744201404~exp=1744205004~hmac=086d27bafbaf4e26649e4ad25a41f3e3493eff04edd7b3b50e5a40a5cd2fa6a1&w=996",
      heading: "About Logistics",
      caption: "It's the art and science of planning, moving, and storing goods efficiently"
    }
  ];

  return (
    <Carousel fade interval={2000} >
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 h-100"
            height={"100px"}
            src={img.url}
            alt={`Slide ${index}`}
          />
          <Carousel.Caption>
            <h3 className='image-heading'>{img.heading}</h3>
            <p>{img.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
