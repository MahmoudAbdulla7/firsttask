import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function DisplayContact({contact}) {
  let [confirmationdelete ,setconfirmationDelete]=useState(false);
  let [className ,setclassName]=useState();
  function deleteButton(){
    setconfirmationDelete(true);
  }
  function cancel(){
    setconfirmationDelete(false);
  }
  async function deleteContact(id){
    const config = {
      headers:{
        "app-id":"64fc4a747b1786417e354f31"
      }
    };
    const url = `https://dummyapi.io/data/v1/user/${id}`;
    const {status}= await axios.delete(url,config)
    if (status==200) {
    setclassName("d-none");
    }
  }
  return (
<>
      <div className={`row d-flex contact ${className}`} >
        <div className="w-25">
            <div className="contactImage p-2">
          <img src={contact.picture} className="w-75 image "  alt="" />
            </div>
        </div>
        <div className="w-50">
          <div className="name text-light">
            <h6 className="my-3"><span>{contact.firstName}</span> <span>{contact.lastName}</span></h6>
            <h6>id: {contact.id}</h6>
          </div>
        </div>
        <div className="w-25">
          <div className="updateAndDelete d-flex">
            <Link to={`updateContact/${contact.id}`} className="fa-solid w-50 fa-pen-to-square my-4 fs-3 mx-2 text-info bg-light p-2 btn"></Link>
            <button onClick={deleteButton} className="fa-solid w-50 fa-trash-can fs-3 my-4 mx-2 text-danger bg-light p-2 btn"></button>
          </div>
        </div>
        {confirmationdelete?        <div className="alert alert-danger py-0">
          <p className="m-1">Are you sure you want to delete {contact.firstName}?</p>
          <button  onClick={()=>{return deleteContact(contact.id)}} className="btn btn-danger mx-2" >Delete</button>
          <button onClick={cancel} className="btn btn-dark">Cancel</button>
          </div>:""}
      </div>
      <div className={`border-top my-2 border-1 ${className}`}></div>
    </>
  );
}
