import { Card } from "react-bootstrap"

import { useEffect, useState } from 'react';

/*
/* This component computes and presents the total amount of purchased products 
*/

export default function AmountPurchasedProducts({products, purchases}) {
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    let price = 0;
    purchases.forEach(purchase => {
      price += products.find(product => product.id === purchase.productId).price;
    })
    setTotalSum(price);
  },[products, purchases])

  return (
    <>
      <Card>
        <Card.Body>
          <strong>Total sum purchased: {totalSum} NIS</strong>
        </Card.Body>
      </Card>
    </>
  )

}