import React, { useEffect, useRef, useState } from 'react'


import  bac  from "../assets/back-to-black.jpg";
import  fallGuy  from "../assets/fall-guy.jpg";

// import  bac  from "../assets/back-to-black-m.png";
// import  fallGuy  from "../assets/fall-guy-m.png";

function BannerV2() {
    const bannerSlider = useRef();
    const [numberOfBanners,setNumberOfBanners] = useState(2)
    const [currentBanner,setCurrentBanner] = useState(0);

 useEffect(()=>{
    
    const intervalSession = setInterval(()=>{
        if(currentBanner < (numberOfBanners-1))
            setCurrentBanner((prevValue) => prevValue = prevValue+1)
        else
            setCurrentBanner((prevValue) => prevValue = prevValue*0)
    },4000);

    return () =>{
        clearInterval(intervalSession);
    }
 },[currentBanner]);

 const startSlideShow = ()=>{
    
 }

  return (
    <div className='lg:overflow-clip'>
        {/* {currentBanner} */}
      <div id="banner-slide" className='lg:h-[40vh]' ref={bannerSlider} style={{transform:`translate(-${(100/numberOfBanners)*currentBanner}%)`}}>
        <img src={bac} alt='Back to Black'></img>
        <img src={fallGuy} alt={fallGuy}></img>
      </div>
    </div>
  )
}

export default BannerV2
