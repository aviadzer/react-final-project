
import { useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams  } from "react-router-dom";
import {
    fetchACustomerFromDataBase, 
    updateACustomerInDataBase, 
    deleteACustomerAndRelatedPurchasesFromDataBase,
    addACustomerToDataBase
} from '../util/util';

/* 
  This component lets the user Add, Edit or Delete a customer.
  Add or Edit mode is selected by the ID of the customer in the URL.
  ID=-1 is presumed invalid and considered an Add mode.
  Deleting a customer involves deleting his/her purchases from the DB
*/
function EditOrAddCustomer() {
    const params = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({firstName:'', lastName:'', city:''});
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const cityRef = useRef();
    const isEditMode = useRef(false);

    useEffect(() =>
    {
        if(params.id !== '-1')
            isEditMode.current = true;
        async function getCustomer()
        {
            let id = params.id;
            let resp = await fetchACustomerFromDataBase(id);
            setCustomer(resp);
        }
        if(isEditMode.current)
            getCustomer()
    },[])

    async function handleSubmit(e) {
        e.preventDefault()
        let resp;

        try {
            if(isEditMode.current){
                let id = params.id;
                resp = await updateACustomerInDataBase(id, firstNameRef.current.value, lastNameRef.current.value, cityRef.current.value);  
            }
            else
                resp = await addACustomerToDataBase(firstNameRef.current.value, lastNameRef.current.value, cityRef.current.value);  
            navigate(-1)
        } catch {
            if(isEditMode.current)
                console.log('Failed to update the customer, respose:', resp)
            else
                console.log('Failed to add the customer, respose:', resp)    
        }

    }

    async function handleDelete(e) {
        e.preventDefault()
        let id = params.id;
        try {
            let resp = await deleteACustomerAndRelatedPurchasesFromDataBase(id);  
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
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" defaultValue={customer.firstName} ref = {firstNameRef} placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" defaultValue={customer.lastName} ref = {lastNameRef} placeholder="Enter last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" defaultValue={customer.city} ref = {cityRef} placeholder="Enter city" />
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

export default EditOrAddCustomer;