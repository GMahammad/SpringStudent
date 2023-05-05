import { Fragment } from "react"
import logo from '../assets/img/logo.png'
import classes from "../Pages/Welcome.module.css"
const Welcome = ()=>{
    return(

        <Fragment>
        <nav>
            <div className={classes.logo}>
                <img src={logo} alt="No image found!"/>
            </div>
            <div className={classes.navBar}>
                <ul>
                    <li><a>Home</a></li>
                    <li><a>Books</a></li>
                    <li><a>Student List</a></li>
                    <li><a>About Us</a></li>
                </ul>
            </div>
        </nav>
    </Fragment>

)

}

export default Welcome