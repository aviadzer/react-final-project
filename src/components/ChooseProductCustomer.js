import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PurchaseProduct from "./PurchaseProduct";

/* 
  This component lets the user choose a Product from a combo box.
  If an extension to the project is required, this component can easily be 
  extended to let the user choose a customer, or both a product and a customer
*/

export default function ChooseProductCustomer({customers, products, selectedCustomer, selectedProduct, purchases, view, buttonText, popOverState, setPopOverState, index}) { 
  const closePopOverCallback = (needReload = false) => {
    setPopOverState(-1);
    if(needReload)
      window.location.reload();
  }

  return (
    <>
      <OverlayTrigger id={selectedCustomer.id} placement="right" overlay={  
          <Popover id={selectedCustomer.id} title="Purchase a product">
            <PurchaseProduct customers={customers} selectedCustomer={selectedCustomer} products={products} selectWhat={'Product'} closeCallback = {closePopOverCallback}/> 
          </Popover>} show={index === popOverState}>
          <Button disabled={index === popOverState} onClick={() => {setPopOverState(index)}}>{buttonText}</Button>
      </OverlayTrigger>
    </>
  )
}