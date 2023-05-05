import { Avatar, Button } from "antd"
import Container from "./Container"
import classes from "./Footer.module.css"
const Footer =(props)=>{
return (
    <div className={classes.footer}>
        <Container>
            {props.numberOfStudents ? <Avatar style={{backgroundColor:'#f56a00',marginRight:'5px'}} size='large'>{props.numberOfStudents}</Avatar> : null}
            <Button onClick={props.toggleModalHandler} type="primary">Add New Student +</Button>
        </Container>
    </div>
)
}
export default Footer