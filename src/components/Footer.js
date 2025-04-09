import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'
import { MdMail } from "react-icons/md";
import { FaLinkedin, FaPhone } from "react-icons/fa6";
import { RiHomeOfficeFill } from "react-icons/ri";
import { FaFacebook, FaYoutubeSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer-main-container'>
       <div className='footer-container'>
            <div className='footer-icon-container'>
               <MdMail className='mail' style = {{margin: 0, padding : 0}}/>
               <p className='icon-para'>info@zipaworld.com</p>
            </div>
            <div className='footer-icon-container'>
               <FaPhone className='mail' />
               <p className='icon-para'>+91 120 691 6910</p>
            </div>
            <div className='footer-icon-container'>
            <RiHomeOfficeFill className='mail'/>
            <div className='heading-para-container'>
            <h3 className='footer-heading'>Noida Office</h3>
               <p className='icon-para'>
               B-29, 3rd Floor, Sector 1, Noida, Uttar Pradesh, 201301</p>
            </div>
            </div>
       </div>
       <div className='connecting-icons'>
         <Link href= 'https://www.linkedin.com/company/aaa2innovatepvtltd/posts/?feedView=all' > <FaLinkedin className='linkedin'/></Link>
         <Link href= '/' > <FaFacebook  className='linkedin'/></Link>
         <Link href= '/' > <FaInstagramSquare className='linkedin' /></Link>
         <Link href= '/' > <FaYoutubeSquare className='linkedin' /></Link>
       </div>
    </div>
  )
}

export default Footer
