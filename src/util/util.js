import {firebaseStore} from '../firebase';

/* 
  This module implements CRUD functions to Firebase DB.
  It has functions relating to Customers, Products and Purchases.
  It implements macros for deleting relevant purchases when deleting a user or a product
*/

const fetchAllCustomersFromDataBase = async () => {
    let data = await firebaseStore.collection('customers').get();
    let customersData = [];
    data.forEach(doc =>
     {
       let obj = { id : doc.id, firstName : doc.data().firstName, lastName : doc.data().lastName, city : doc.data().city};
       customersData.push(obj);
     })
 
     return customersData;
  }

  const fetchACustomerFromDataBase = async (id) => {
    let doc = await firebaseStore.collection('customers').doc(id).get();
    let obj = { id : doc.id, firstName : doc.data().firstName, lastName : doc.data().lastName, city : doc.data().city};
    return obj;
  }

  const updateACustomerInDataBase = async (id, firstName, lastName, city) => {
    await firebaseStore.collection('customers').doc(id).update({firstName: firstName, lastName: lastName, city: city});
    return 'Updated!';
  }

  const deleteACustomerFromDataBase = async (id) => {
    await firebaseStore.collection('customers').doc(id).delete();
    return 'Updated!';
  }
  const deleteACustomerAndRelatedPurchasesFromDataBase = async (id) => {
    let data = await firebaseStore.collection('purchases').where("customerId", "==", id).get();
    data.forEach(async (doc) =>{
       await firebaseStore.collection('purchases').doc(doc.id).delete();
    })
    deleteACustomerFromDataBase(id);
    return 'Updated!';
  }

  const addACustomerToDataBase = async (firstName, lastName, city) => {
    await firebaseStore.collection('customers').add({firstName: firstName, lastName: lastName, city: city});
    return 'Added!';
  }

  const fetchAllProductsFromDataBase = async () => {
    let data = await firebaseStore.collection('products').get();
    let productsData = [];
    data.forEach(doc =>
     {
       let obj = { id : doc.id, name : doc.data().name, price : doc.data().price, quantity : doc.data().quantity};
       productsData.push(obj);
     })
 
     return productsData;
  }

  const fetchAProductFromDataBase = async (id) => {
    let doc = await firebaseStore.collection('products').doc(id).get();
    let obj = { id : doc.id, name : doc.data().name, price : doc.data().price, quantity : doc.data().quantity};
    return obj;
  }

  const updateAProductInDataBase = async (id, name, price, quantity) => {
    await firebaseStore.collection('products').doc(id).update({name: name, price: price, quantity: quantity});
    return 'Updated!';
  }

  const deleteAProductFromDataBase = async (id) => {
    await firebaseStore.collection('products').doc(id).delete();
    return 'Updated!';
  }
  
  const deleteAProductAndRelatedPurchasesFromDataBase = async (id) => {
    let data = await firebaseStore.collection('purchases').where("productId", "==", id).get();
    data.forEach(async (doc) =>{
       await firebaseStore.collection('purchases').doc(doc.id).delete();
    })
    deleteAProductFromDataBase(id);
    return 'Updated!';
  }

  const addAProductToDataBase = async (name, price, quantity) => {
    await firebaseStore.collection('products').add({name: name, price: price, quantity: quantity});
    return 'Added!';
  }

  const fetchtAllPurchasesFromDataBase = async () => {
    let data = await firebaseStore.collection('purchases').get();
    let purchasesData = [];
    data.forEach(doc =>
     {
       let obj = { id : doc.id, customerId : doc.data().customerId, productId : doc.data().productId, date : doc.data().date};
       purchasesData.push(obj);
     })
 
     return purchasesData;
  }

  const addAPurchaseToDataBase = async (customerId, productId, date) => {
    await firebaseStore.collection('purchases').add({customerId: customerId, productId: productId, date:date});
    return 'Added!';
  }

  const FetchUserPrivilage = async (email) => {
    let doc = await firebaseStore.collection('users').where("userName", "==", email).get(); 
    let privilage;
    doc.forEach(d=> {
    privilage = d.data().privilage })
    return privilage;
  }

  export {
    fetchAllCustomersFromDataBase,
    fetchACustomerFromDataBase,
    updateACustomerInDataBase,
    deleteACustomerFromDataBase,
    deleteACustomerAndRelatedPurchasesFromDataBase,
    addACustomerToDataBase,
    fetchAllProductsFromDataBase,
    fetchAProductFromDataBase,
    updateAProductInDataBase, 
    deleteAProductFromDataBase,
    deleteAProductAndRelatedPurchasesFromDataBase,
    addAProductToDataBase,
    fetchtAllPurchasesFromDataBase,
    addAPurchaseToDataBase,
    FetchUserPrivilage
  }


