import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import CustomersTable from './CustomersTable';
import { useAuth } from "../contexts/AuthContext"

export default function ProductsTable({customers, products, purchases}) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate('/EditOrAddProduct/-1');
  }
  return (
    <>
        <Table striped bordered hover className="table-responsive text-nowrap">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
        <tbody>
        {products.map((product, index) => {
         
          return(
          <tr key={product.id}>
            <td>{index+1}</td>
            <td>
              {currentUser.privilage === 'admin' && <Link to={('/EditOrAddProduct/'+product.id)}>{`${product.name}`}</Link>}
              {currentUser.privilage === 'simple user' && `${product.name}`}
            </td>
            <td>
              {product.price}
            </td>
            <td>
              {product.quantity}
            </td>
            <td><CustomersTable customers={customers} products={products} selectedProduct={product} purchases={purchases} view={'ProductView'} /></td>
          </tr>)
        })}
        </tbody> 
      </Table>
      {currentUser.privilage === 'admin' && <Button variant="primary" onClick={()=> handleAddProduct()}>Add a product</Button>}
    </>
  )
}