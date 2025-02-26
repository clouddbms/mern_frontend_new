import styles from './notfound.module.css'
import { Link } from 'react-router-dom'
function NotFound()
{
  return (<div >
  <Link to="/home"> <button className={styles.home}>Go to Home</button>  </Link>
  <div style={{display:'flex',justifyContent:'center',width:'500px',height:'400px',margin:'auto',borderRadius:'10px',overflow:'hidden'}}>
<img src={require("../assets/images/errorphoto.jpg")} alt=""/>
</div>
</div>)
}
export default NotFound