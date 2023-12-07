import React, { useEffect,useRef } from "react";
import Card from "./card";
import "../styles/productStyle.css";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { createProducts, showProducts, updateProducts } from "../features/productDetails";
const Modal = ({ isOpen, onClose, onSave, editId,isEditabled }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageLink, setImageLink] = useState("");
  const dispatch = useDispatch();
  const {products,loading} = useSelector((state) => state.app);
  const product = products.filter((product) => product.productId === editId);
  useEffect(() => {
    dispatch(showProducts());
  }, []);
  useEffect(() => {
    if(isEditabled){
      setTitle(product[0].productName);
      setPrice(product[0].productPrice);
      setDescription(product[0].productDescription);
      setType(product[0].productType);
      setImageLink(product[0].imageUrl);
    }
    else{
      setTitle("");
      setPrice("");
      setDescription("");
      setType("");
      setImageLink("");
    }
  }, [isEditabled,editId]);
  const handleSave = () => {
    const products = {
      "productName": title,
      "productPrice": price,
      "productDescription": description,
      "productType": type,
      "imageUrl": imageLink,
    };
    onSave(products);
    setTitle("");
    setPrice("");
    setDescription("");
    setType("");
    setImageLink("");
    onClose();
  };
  const handleUpdate = () => {
    const products = {
      "productId": editId,
      "productName": title,
      "productPrice": price,
      "productDescription": description,
      "productType": type,
      "imageUrl": imageLink,
    };
    dispatch(updateProducts(products));
    setTitle("");
    setPrice("");
    setDescription("");
    setType("");
    setImageLink("");
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Product Details</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label>Image Link:</label>
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        {!isEditabled? <button onClick={handleSave}>Save</button> :<button onClick={handleUpdate}>Update</button>}
      </div>
    </div>
  );
};

const Products = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Product Title",
    price: 0,
    description: "Product Description",
    type: "Product Type",
    imageLink: "https://example.com/image.jpg",
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false);setIsEditabled(false);}

  const dispatch = useDispatch();

  const handleSave = (products) => {
    setModalData(products);
    console.log("Saving data:", products);
    dispatch(createProducts(products));
  };


  const { products, loading } = useSelector((state) => state.app);

  const[isEditabled,setIsEditabled]=useState(false);
  const[editId,setEditId]=useState();
  const handleEdit = (id) => {
    console.log("Editing product with id:", id);
    setModalIsOpen(true);
    setIsEditabled(true);
    setEditId(id);
  };

  useEffect(() => {
      dispatch(showProducts())

  }, []);

  return (
    <div>
      <button style={{ marginLeft: "25px" }} onClick={openModal}>
        Add Products
      </button>
      <Modal isOpen={modalIsOpen} onClose={closeModal} onSave={handleSave} isEditabled={isEditabled} editId={editId} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Card key={product.productId} product={product} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default Products;
