import {useState, useEffect} from 'react'
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import CustomersTable from './CustomersTable';
import {
    fetchAllCustomersFromDataBase,
    fetchAllProductsFromDataBase,
    fetchtAllPurchasesFromDataBase
  } from '../util/util';

/*
  This component implements the Purchased page of the application.
  Upon loading, it reads from the database all Customers, Products and Purchases data
  and passes it on to the relevant components for display.
  It implements filters for Products and Customers to be displayed 
*/


export default function Purchased() {
    const [selectedCustomerId, setSelectedCustomerId] = useState(['']);
    const [selectedProductId, setSelectedProductId] = useState(['']);
    const [data, setData] = useState({customers:[], products:[], purchases:[]});
    const [filteredCustomers, setFilteredCustomers] = useState();
    const [filteredProducts, setFilteredProducts] = useState();

    useEffect(() => {
        const getData = async () =>{
          const cust = await fetchAllCustomersFromDataBase();
          const prod = await fetchAllProductsFromDataBase();
          const purch = await fetchtAllPurchasesFromDataBase();
          setData({customers:cust, products: prod, purchases: purch});
        }
        getData();
    },[])

    useEffect(() => {
        handleDisplayPurchases();   
    },[data])

    const handleDisplayPurchases = () => { 
        setFilteredCustomers(
            selectedCustomerId[0]==='' ? data.customers:data.customers.filter(customer => customer.id === selectedCustomerId[0])
        )
        setFilteredProducts(
            selectedProductId[0]==='' ? data.products : data.products.filter(product => product.id === selectedProductId[0])
        )    
    }

    return (
        <>
            <Container >
                <Row>
                    <h3 style={{color:'blue', fontWeight:'bold'}}>Purchased page</h3>
                </Row>
                <Row><br/></Row>
                <Row>
                    {data.customers.length > 0 && data.products.length > 0 && <div style={{display:'flex'}}>
                        <table>
                            <thead>
                            <tr>
                                <th style={{textAlign:'center'}}>Customers filter</th>
                                <th style={{textAlign:'center'}}>Products filter</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                        <BootstrapSelect placeholder={'Select a customer'} showSearch onChange={(selected) => setSelectedCustomerId(selected.selectedKey)}
                        options={[{"labelKey": '', "value": 'None selected', "isSelected": true, "style": {"color": "grey"}},
                            ...data.customers?.map(customer => {
                                return (
                                    {
                                        "labelKey": customer.id,
                                        "value": `${customer.firstName} ${customer.lastName}`
                                    }
                                )
                            })
                        ]
                            } />
                            </td>
                            <td>
                        <BootstrapSelect placeholder={'Select a product'} showSearch onChange={(selected) => setSelectedProductId(selected.selectedKey)} 
                            options={[{"labelKey": '', "value": 'None selected', "isSelected": true, "style": {"color": "grey"}},
                            ...data.products?.map(product => {
                                    return (
                                        {
                                            "labelKey": product.id,
                                            "value": `${product.name}`
                                        }
                                    )
                                })]}
                            />
                            </td>
                            <td>
                        <Button variant='primary' onClick={handleDisplayPurchases}>Apply Filters</Button>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>}<br/><br/>
            </Row>
            <Row>
                <CustomersTable customers={filteredCustomers} products={filteredProducts} purchases={data.purchases} view={'PurchasedView'} />
            </Row>

        </Container>
    </>
  )
}
