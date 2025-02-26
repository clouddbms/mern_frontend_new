import styles from './loading.module.css'
function LoadingAnimation(){
   return <div className={styles.loading}>
    <img src={require("../../assets/images/load_2.gif")} alt="" class="loading-img" />
</div>
}
export default LoadingAnimation;