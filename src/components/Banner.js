
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Banner.css';

const Banner = () => {
  const images = [
    {
      url: "https://plus.unsplash.com/premium_photo-1661879449050-069f67e200bd?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "About AAA 2 Innovate Pvt Ltd",
      caption: "We call AAA 2 Innovate Pvt Ltd., not a company but a concept."
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661963312443-e6f80b64ace6?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "About Zipaworld",
      caption: "Zipaworld is a leading logistics company providing all the solutions related to logistics services."
    },
    {
      url: "https://img.freepik.com/premium-photo/foreman-control-loading-containers-box-truck_28668-241.jpg",
      heading: "About Logistics",
      caption: "It's the art and science of planning, moving, and storing goods efficiently"
    }
  ];

  return (
    <Carousel fade interval={2000} >
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={img.url}
            alt={`Slide ${index}`}
          />
          <Carousel.Caption>
            <h3>{img.heading}</h3>
            <p>{img.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
