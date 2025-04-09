import React from 'react'
import './Hero.css'
const Hero = () => {
  return (
    <div className='hero-main-container'>
      <div className='hero-container'>
        <div className='head-para-container'>
           <h2>Logistics in simple words</h2>
           <p className='welcome-para'>
          
           Zipaworld redefines the way the logistics industry and its operations work. We use cutting-edge technology and innovative solutions to deliver values of trust, commitment, and services with a sense of ownership. Irrespective of the size of your business,
            we empower your business to streamline supply chains and access a comprehensive suite of logistics solutions.
           </p>
        </div>
        <div className='hero-image-container'>
            <img src = "https://shipsy.io/wp-content/uploads/2021/01/Blog-70-Option2.jpg" alt = "logo" 
             className='hero-image'
            />
        </div>
      </div>
      {/* <div className='services-container'>
          <div className='logistics-service-container'>
          <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8QclPL4BgwexBsRViyX5FoKuF7L-pPcjLg&s" alt = "service1"  
          className='services-image'
          />
            <h2>logistics</h2>
            <p className='welcome-para'>This is about logistics</p>
          </div>

          <div className='logistics-service-container'>
          <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8QclPL4BgwexBsRViyX5FoKuF7L-pPcjLg&s" alt = "service1"  
          className='services-image'
          />
            <h2>logistics</h2>
            <p className='welcome-para'>This is about logistics</p>
          </div>


          <div className='logistics-service-container'>
          <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8QclPL4BgwexBsRViyX5FoKuF7L-pPcjLg&s" alt = "service1"  
          className='services-image'
          />
            <h2>logistics</h2>
            <p className='welcome-para'>This is about logistics</p>
          </div>
      </div> */}
    </div>
  )
}

export default Hero
