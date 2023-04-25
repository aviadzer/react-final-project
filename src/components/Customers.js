import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CustomersTable from './CustomersTable';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../contexts/AuthContext"
import {
  fetchAllCustomersFromDataBase,
  fetchAllProductsFromDataBase,
  fetchtAllPurchasesFromDataBase
} from '../util/util'

/*
  This component implements the Customers page of the application.
  Upon loading, it reads from the database all Customers, Products and Purchases data
  and passes it on to the relevant components for display
*/

export default function Customers() {
  const { currentUser } = useAuth();
  const [data, setData] = useState({customers:[], products:[], purchases:[]});
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () =>{
      const cust = await fetchAllCustomersFromDataBase();
      const prod = await fetchAllProductsFromDataBase();
      const purch = await fetchtAllPurchasesFromDataBase();
      setData({customers:cust, products: prod, purchases: purch});
    }
    getData();
  },[])

  const handleAddCustomer = () => {
    navigate('/EditOrAddCustomer/-1');
  }

 
  return (
    <>
      <Container >
        <Row>
          <h3 style={{color:'blue', fontWeight:'bold'}}>Customers page</h3>
        </Row>
        <Row><br/></Row>
        <Row>
          <CustomersTable customers={data.customers} products={data.products} purchases={data.purchases} view={'CustomerView'} />
      </Row>
      <Row><br/></Row>
      <Row>
       {currentUser.privilage === 'admin' && <Button variant="primary" onClick={()=> handleAddCustomer()}>Add a customer</Button>}
      </Row>
      <Row><br/></Row>      

      </Container>
    </>
  )
}