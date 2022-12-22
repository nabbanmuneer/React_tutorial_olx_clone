import React, { Fragment, useState ,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/firebaseContext';
import { useHistory } from "react-router-dom";

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [Name, setName] = useState();
  const [Category, setCategory] = useState();
  const [Price, setPrice] = useState();
  const [Image, setImage] = useState();
  const history = useHistory();
  const date =new Date ()
  const handleSubmit =(e)=>{
    e.preventDefault();
    firebase.storage().ref(`/image/${Image.name}`).put(Image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          Name,
          Category,
          Price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/');
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price" />
          <br />

          <br />
          <img alt="Posts" width="200px" height="200px"
            src={Image ? URL.createObjectURL(Image) : ''}></img>

          <br />
          <input onChange={(e) =>
            setImage(e.target.files[0])
          }
            type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
