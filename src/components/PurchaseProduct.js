import {useState, useEffect} from 'react'
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import Button from 'react-bootstrap/Button';
import {
    addAPurchaseToDataBase
} from '../util/util';

/* 
    This component lets the user to execute a "Buy" - adding a purchase 
    that includes the ids of a customer and a product 
*/

export default function PurchaseProduct({customers, products, selectedProduct, selectedCustomer, selectWhat, closeCallback}) {
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');

    useEffect (() => {
        switch (selectWhat) {
            case 'Product':
                setSelectedCustomerId([selectedCustomer?.id]);
                break;
            case 'Customer':
                setSelectedProductId([selectedProduct?.id]);
                break;
    
        }
    },[])
 
    const customerOptions = customers.map(customer => {
        return (
            {
                "labelKey": customer.id,
                "value": `${customer.firstName} ${customer.lastName}`
            }
        )
    })
    const productOptions = products.map(product => {
        return (
            {
                "labelKey": product.id,
                "value": `${product.name}`
            }
        )
    })

    const handleBuy = async () => {
        console.log('selectedCustomerId[0] = ', selectedCustomerId[0])
        try {
            await addAPurchaseToDataBase(selectedCustomerId[0],selectedProductId[0], new Date())
            console.log('Purchase added to the database')
            closeCallback(true);
        }
        catch{
            console.log('Failed to add a purchase to the database')
        }
    }

    return (
        <div style={{width:'100%', height:'100px', textAlign:'center'}}>
            <h4 style={{color:'red'}}>By a product</h4>    
            <div style={{display:'flex'}}>
                {(selectWhat === 'Customer' || selectWhat === 'CustomerAndProduct') && <BootstrapSelect placeholder={'Select a customer'} showSearch onChange={(selected) => setSelectedCustomerId(selected.selectedKey)} options={customerOptions} />}{'  '}
                {(selectWhat === 'Product' || selectWhat === 'CustomerAndProduct') && <BootstrapSelect placeholder={'Select a product'} showSearch onChange={(selected) => setSelectedProductId(selected.selectedKey)} options={productOptions} />}{' '}
            </div>
            <div>
                <Button style={{margin:'10px'}} variant='primary' disabled={selectedCustomerId.length===0 || selectedProductId.length===0} onClick={()=>{handleBuy()}}>Save</Button>{'   '}
                <Button style={{margin:'10px'}} variant='outline-primary' onClick={()=>{closeCallback(false)}}>Cancel</Button>{'   '}
            </div>
        </div>
  )
}
