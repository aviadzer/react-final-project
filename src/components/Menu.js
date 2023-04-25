
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

/*
    This component implements the Menu page of the application
*/

export default function Menu ()  {
    const navigate = useNavigate();

    return (
    <div style={{width:'100%'}}>
        <h3 style={{color:'blue', fontWeight:'bold'}}>Welcome to our store!</h3>
        <Button variant='outline-primary' onClick={() => navigate('/Customers')}>Customers</Button> {'  '}
        <Button variant='outline-primary' onClick={() => navigate('/Products')}>Products</Button> {'  '}
        <Button variant='outline-primary' onClick={() => navigate('/Purchased')}>Purchased</Button>
    </div>
    )
}