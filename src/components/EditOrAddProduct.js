
import { useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams  } from "react-router-dom";
import {
    fetchAProductFromDataBase, 
    updateAProductInDataBase, 
    deleteAProductAndRelatedPurchasesFromDataBase,
    addAProductToDataBase
} from '../util/util';

/* 
  This component lets the user Add, Edit or Delete a product.
  Add or Edit mode is selected by the ID of the product in the URL.
  ID=-1 is presumed invalid and considered an Add mode.
  Deleting a product involves deleting its related purchases from the DB
*/

function EditOrAddProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({name:'', price:'', quantity:''});
    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const isEditMode = useRef(false);

    useEffect(() =>
    {
        if(params.id !== '-1')
            isEditMode.current = true;
        async function getProduct()
        {
            let id = params.id;
            let resp = await fetchAProductFromDataBase(id);
            setProduct(resp);
        }
        if(isEditMode.current)
            getProduct()
    },[])

    async function handleSubmit(e) {
        e.preventDefault()
        let resp;

        try {
            if(isEditMode.current){
                let id = params.id;
                resp = await updateAProductInDataBase(id, nameRef.current.value, parseFloat(priceRef.current.value), parseInt(quantityRef.current.value));  
            }
            else
                resp = await addAProductToDataBase(nameRef.current.value, parseFloat(priceRef.current.value), parseInt(quantityRef.current.value));  
            navigate(-1)
        } catch {
            if(isEditMode.current)
                console.log('Failed to update the product, respose:', resp)
            else
                console.log('Failed to add the product, respose:', resp)    
        }

    }

    async function handleDelete(e) {
        e.preventDefault()
        let id = params.id;
        try {
            let resp = await deleteAProductAndRelatedPurchasesFromDataBase(id);  
            navigate(-1)
        } catch {
        }
    }

    async function handleCancel(e) {
        e.preventDefault()
        navigate(-1)
    }
      
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" defaultValue={product.name} ref = {nameRef} placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" defaultValue={product.price } ref = {priceRef} placeholder="Enter price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" defaultValue={product.quantity} ref = {quantityRef} placeholder="Enter quantity" />
      </Form.Group>
      <Form.Group className="mb-3">
      <Button variant="primary" type="submit">
        {isEditMode.current && <>Update</>}
        {!isEditMode.current && <>Add</>}
      </Button>{' '}
      {isEditMode.current && <Button variant="outline-danger" type="button" onClick={(e) => handleDelete(e)}>
        Delete
      </Button>}
      {' '}<Button variant="outline-primary" type="button" onClick={(e) => handleCancel(e)}>
        Cancel
      </Button>

      </Form.Group>

    </Form>
    
  );
}

export default EditOrAddProduct;