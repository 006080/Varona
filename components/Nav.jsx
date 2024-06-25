import styles from "./Nav.module.css"

const Nav = ({children}) => {
  return (
    <div className={styles.nav}>
     <div className={styles.navBarContentWrapper}>{children}</div>
    </div>  
  )
}

export default Nav
