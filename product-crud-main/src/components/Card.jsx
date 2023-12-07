import React, { useEffect, useState } from "react";
import "../styles/cardStyle.css";
import '../styles/viewModalStyle.css';
import { useDispatch,useSelector } from "react-redux";
import { deleteProducts, showProducts } from "../features/productDetails";

const ViewModal = ({ isOpen, onClose, productId}) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const {products,loading} = useSelector((state) => state.app);
  const product = products.filter((product) => product.id === productId);
  useEffect(() => {
    dispatch(showProducts());
  }, []);
  console.log(product)
  const {productName,productPrice,productDescription,productType,imageUrl} = product[0];

  // const title="Product Details";
  // const price=122;
  // const description='awdas dasd a sd ad ad asd';
  // const type='electronic';
  // const imageLink="https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg";


  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{productName}</h2>
        <img className="modal-image" src={imageUrl} alt={productName} />
        <label>Price:</label>
        <div>{productPrice}</div>
        <label>Description:</label>
        <div>{productDescription}</div>
        <label>Type:</label>
        <div>{productType}</div>
      </div>
    </div>
  );
};

const Card = ({ product , onEdit}) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const [productId, setProductId ] = React.useState();
  
  const openModal=(id)=>{
    setIsOpen(true);
    setProductId(id);
  }
const editModal=(id)=>{
  onEdit(id);
}

  const deleteProduct=(id)=>{
    const isconfirmed=window.confirm("Are you sure you want to delete this product?");
    if(isconfirmed){
      dispatch(deleteProducts(id));
    }
    else{
      return;
    }
  }


  return (
    <div>
    <ViewModal isOpen={isOpen} onClose={() => setIsOpen(false)} productId={productId} />
    <div className="card-containers">
    <div className="image">
    <img
    src={product.imageUrl?product.imageUrl:"https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"}
    alt=""
    />
    </div>
    <div className="cardflex">
    <div className="title">
    <p>{product.productName}</p>
    </div>
    <div className="price">
    <p>₹{product.productPrice}</p>
    </div>
    </div>
    
    <div className="desc">
    <p>{product.productDescription.substring(0,20)}</p>
    </div>
    
    <button className="btn-view"  onClick={()=>{openModal(product.id)}}>View</button>
    <button className="btn-update" onClick={()=>{editModal(product.productId)}}  >Update</button>
    <button className="btn-delete" onClick={()=>{deleteProduct(product.productId)}}>Delete</button>
    </div>
    </div>
    );
};1

export default Card