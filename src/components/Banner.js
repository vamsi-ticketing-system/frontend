import React, { useEffect, useRef, useState } from 'react';

import  bac  from "../assets/back-to-black.jpg";
import  fallGuy  from "../assets/fall-guy.jpg";

function Banner() {

  const bannerRef = useRef(null);


  const [noOfBanners,setNoBanners] = useState(3);
  const [currentBannerIndex,setCurrentBannerIndex]  = useState(0);


  useEffect(()=>{
    bannerTransition();
  },[currentBannerIndex]);

  const bannerTransition = () =>{
    setInterval(()=>{
      if(currentBannerIndex >= (noOfBanners)){
        setCurrentBannerIndex((prevValue)=> prevValue = prevValue*0);
      }
      else{
        setCurrentBannerIndex((prevValue)=> prevValue = prevValue+1);
      }
    },3000);
  }

  const [banners,setBanners] = useState([{id:0,src: bac},{id:1,src: fallGuy},{id:2,src: bac},{id:3,src: fallGuy}]);

  return (
    <div className='banner-container position-relative'>
      {/* {currentBannerIndex} */}
        <div ref={bannerRef} className='banners flex flex-row relative'>
        {
            banners.map((banner, index)=>{
              return (
                <img key={banner.id} id={`banner-${banner.id}`} className={`banner absolute ${currentBannerIndex === banner.id ? 'z-index-1':''}`} src={banner.src} alt='Power rangers'></img>
              )
            })
          }
          
          
        </div>
        {/* <div className='flex flex-row gap-1 justify-center items-center position-absolute bottom-0 left-50'>
          {
            banners.map((banner, index)=>{
              return (
                <a key={banner} className='banner-bullet' href={`#banner-${banner}`}>1</a>
              )
            })
          }
        </div> */}
    </div>
  )
}

export default Banner
