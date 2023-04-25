import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import AmountPurchasedProducts from './AmountPurchasedProducts'
import ProductsTable from './ProductsTable';
import {
  fetchAllCustomersFromDataBase,
  fetchAllProductsFromDataBase,
  fetchtAllPurchasesFromDataBase
} from '../util/util'

/*
  This component implements the Products page of the application.
  Upon loading, it reads from the database all Customers, Products and Purchases data
  and passes it on to the relevant components for display
*/

export default function Products() {
  const [data, setData] = useState({customers:[], products:[], purchases:[]});
  useEffect(() => {
    const getData = async () =>{
      const cust = await fetchAllCustomersFromDataBase();
      const prod = await fetchAllProductsFromDataBase();
      const purch = await fetchtAllPurchasesFromDataBase();
      setData({customers:cust, products: prod, purchases: purch});
    }
    getData();
  },[])

 
  return (
    <>
      <Container >
        <Row>
          <h3 style={{color:'blue', fontWeight:'bold'}}>Products page</h3>
        </Row>
        <Row><br/></Row>
        <Row>
          <AmountPurchasedProducts products={data.products} purchases={data.purchases} />
        </Row>
        <Row><br/></Row>
        <Row>
          <ProductsTable customers={data.customers} products={data.products} purchases={data.purchases} />
      </Row>
      <Row><br/></Row>
      </Container>
    </>
  )
}