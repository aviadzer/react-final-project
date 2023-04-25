import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState } from 'react';
import ChooseProductCustomer from "./ChooseProductCustomer";
import { useAuth } from "../contexts/AuthContext"

/*
  This component presents the customers table.
  It has several views that are changed based on props values
*/

export default function CustomersTable({customers, products, selectedCustomer, selectedProduct, purchases, view}) {
  const { currentUser } = useAuth();
  const [popOverState, setPopOverState] = useState(-1);
  
  const closePopOverCallback = (needReload = false) => {
    setPopOverState(-1);
    if(needReload)
      window.location.reload();
  }

  return (
    <>
        <Table striped bordered hover className="table-responsive text-nowrap">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Purchase date</th>
              <th>{(view === 'CustomerView'  || view ==='PurchasedView') && <>Purchased products</>}</th>
            </tr>
          </thead>
        <tbody>
        {customers?.map((customer, index) => {
          const purchasesProducts = [];
          purchases.filter(purch => purch.customerId === customer.id).sort((a,b) => a.date-b.date).forEach(pur => { 
            if(products.find(product => product.id === pur.productId) !== undefined){
            purchasesProducts.push({productName: products
              .find(product => product.id === pur.productId)?.name, productId:products
              .find(product => product.id === pur.productId)?.id,
              date: `${pur.date.toDate().getDate()}/${pur.date.toDate().getMonth()+1}/${pur.date.toDate().getFullYear()}`})
            }
            });
      
          return(
          <tr key={customer.id}>
            <td>{index+1}</td>
            <td >
              {currentUser.privilage === 'admin' && <Link to={('/EditOrAddCustomer/'+customer.id)}>{`${customer.firstName} ${customer.lastName}`}</Link>}
              {currentUser.privilage === 'simple user' && `${customer.firstName} ${customer.lastName}`}
            </td>
            <td>
              <ul>
                {(view === 'CustomerView'  || view ==='PurchasedView') && purchasesProducts.map((p, indx) => <li key={indx}>{p.date}</li>)}
                {view === 'ProductView' && purchasesProducts.filter(pu => pu.productId === selectedProduct.id).map((p, indx) => <li key={indx}>{p.date}</li>)}
              </ul>
            </td>
            <td>

               {(view === 'CustomerView' || view ==='PurchasedView') && 
               <ul>
                {purchasesProducts.map((p, ind) => 
                  <li key={ind}>
                    {currentUser.privilage === 'admin' && <Link to={('/EditOrAddProduct/'+p.productId)}>{p.productName}</Link>}
                    {currentUser.privilage === 'simple user' && p.productName}
                  </li>)}
              </ul>}
              {view === 'ProductView' && currentUser.privilage === 'admin' &&                      
                <ChooseProductCustomer customers={customers} selectedCustomer={customer} products={products} selectWhat={'Product'} closeCallback = {closePopOverCallback} buttonText={'Add'} popOverState={popOverState} setPopOverState={setPopOverState} index={index}/> 
              }
            </td>
            {view === 'CustomerView' && currentUser.privilage === 'admin' &&
             <td>        
                <ChooseProductCustomer customers={customers} selectedCustomer={customer} products={products} selectWhat={'Product'} closeCallback = {closePopOverCallback} buttonText={'Buy Product'}popOverState={popOverState} setPopOverState={setPopOverState} index={index}/>
              </td>           
            }
          </tr>)
        })}
        </tbody> 
      </Table>
    </>
  )
}