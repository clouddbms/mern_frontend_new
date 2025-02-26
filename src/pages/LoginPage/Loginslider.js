
import healthimage from '../../assets/images/health-12.jpg'
import studyimage from '../../assets/images/study2.jpg'
import lifestyleimage from '../../assets/images/lifestyle.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
const LoginSlider=()=>{
    const [images]=useState([healthimage,studyimage,lifestyleimage])
    const [imageindex,setImageindex]=useState(0)
    useEffect(()=>{
         let slider= setInterval(() => {
            if(imageindex===images.length-1)
            setImageindex(0)
            else
            {
                setImageindex((prev)=>prev+1)
            }
            
          }, 2000);
          return ()=>{
            clearInterval(slider)

          }
    },[imageindex,images])
    return (
       <div style={{ height:"230px"}}>
        <img src={images[imageindex]} style={{objectFit:"cover",height:"230px",width:"350px",borderRadius:"15px"}} alt=''/>
       </div>
      
    )
}
export default LoginSlider