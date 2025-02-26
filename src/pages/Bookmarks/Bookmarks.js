import React, { useEffect, useState } from 'react'
import { useUser } from '../../providers/UserProvider'
import Styles from './Bookmarks.module.css'
import BookmarkCard from '../../components/BookmarkCard/BookmarkCard';
import MyNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { backendUrl } from '../../backendUrl';
export default function Bookmarks() {
  const [bookmarksData,setBookmarksData] = useState([])
  const {user} = useUser();
  const [loading,setLoading]=useState(false)

  function removebookmark(id)
  {
    let newdata=bookmarksData.filter((bookmark)=>bookmark._id!=id)
  setBookmarksData(newdata)
  }
  
  useEffect(()=>{
    setLoading(true)
    const timeinterval=setTimeout(() => {
       setLoading(false)
    }, 500);
    const url = backendUrl+"/user/"+user._id+"/bookmarks";

    axios.get(url).then((res)=>{
      const data=res.data;
      setBookmarksData(data);
    })
    .catch((err)=>console.log(err));

    return () => clearTimeout(timeinterval);

  },[user])

  return (
    <div className={Styles.bookmarksBody}>
      <MyNavbar/>
       <h1 className={Styles["bookmarked-heading"]}>Bookmarked Articles</h1>
       <div className={Styles["cards"]}>

          {
           bookmarksData.length!==0 && bookmarksData.map((data,i)=>{
              return <BookmarkCard key={i} data={data} removebookmark={removebookmark}/>
            })
          }
          {
            bookmarksData.length==0 && <div style={{display:'flex',justifyContent:'center'}}><img  src={require('../../assets/images/null.png')}/></div>
          }
        </div>
        <Footer/>
    </div>

  )
}
