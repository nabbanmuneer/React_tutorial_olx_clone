import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import { PostContext } from '../../store/PostContex';

import './View.css';
function View() {
  const [UserDetails,setUserDetails] = useState();
  const {PostDetails} = useContext(PostContext)  
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    const {userId} = PostDetails
    firebase.firestore().collection('user').where('id','==',userId).get().then((res)=>{
      res.forEach( doc => {
        console.log(doc.data());
        setUserDetails(doc.data())
      });
    })
  },[])
  


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={PostDetails.url}
          alt="name"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {PostDetails.Price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
       {UserDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{UserDetails.Username}</p>
          <p>{UserDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
