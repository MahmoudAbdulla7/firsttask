import axios from 'axios';
import Joi from 'joi';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdateContact() {
    let {id}=useParams();
    let [newContact, setNewContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        picture: "",
      });
      let [errorList, seterrorList] = useState();
      let [isLoading, setisLoading] = useState(false);
      let [error, setError] = useState();
      const navigate =useNavigate()
      function getContactData(eventInfo) {
        let user = { ...newContact };
        user[eventInfo.target.name] = eventInfo.target.value;
        setNewContact(user);
        console.log(newContact);
      }
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(10).required(),
        lastName: Joi.string().min(3).max(10).required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            maxDomainSegments: 4,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
        phone: Joi.string()
          .pattern(new RegExp(/^(010|011|012|015|013)[0-9]{8}$/))
          .required(),
          picture:Joi.string().required()
      });
      async function sendDataForAddingContact() {
        const config = {
          headers:{
            "app-id":"64fc4a747b1786417e354f31"
          }
        };
        const url = `https://dummyapi.io/data/v1/user/${id}`;
        const data =newContact
        axios.put(url, data, config)
        .then(res => navigate("/firsttask") )
        .catch(err => {if (err.response.status==400) {
          return setError("400")
        }return console.log("err");
      })
      }
      function validateContact() {
        const validationResult =schema.validate(newContact,{abortEarly:false});
          if (validationResult?.error) {
        console.log(validationResult.error.details);
        seterrorList(validationResult.error.details);
        setisLoading(false);
      } else {
        // Validation passed
        sendDataForAddingContact();
        setisLoading(false);
      }
      }
      function addUser(e) {
        setisLoading(true);
        e.preventDefault();
        validateContact();
      }

  return (
    <>
      <div className="container bg-light rounded-4">
        <div className="border border-1 rounded-4">
          <form onSubmit={addUser}>
            <div className="contactProfile mb-4 text-center d-flex justify-content-center">
              <div className="container mt-5">
                <div>
                  <div className="form-group">
                    <div className="custom-file">
                      <input
                        onChange={getContactData}
                        type="file"
                        className="custom-file-input"
                        name="picture"
                        id="photo"
                        accept="image/*"
                      />
                      {errorList?.filter(el=>el.context.label=='picture')[0]?<div className="alert alert-danger rounded-4 py-1 my-2">{errorList?.filter(el=>el.context?.label=='picture')[0].message}</div>:''}
 
                      {newContact?.picture ? (
                        <img
                          className="w-100 image"
                          src={`http://localhost:3000/${newContact.picture}`}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <h6 className="mt-4">Upload Photo</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="firstName p-4">
                  <input
                    onChange={getContactData}
                    name="firstName"
                    placeholder="First name"
                    className="form-control rounded-5"
                    type="text"
                  />
                  {errorList?.filter(el=>el.context.label=='firstName')[0]?<div className="alert alert-danger rounded-4 py-1 my-2">{errorList?.filter(el=>el.context?.label=='firstName')[0].message}</div>:''}
                </div>
              </div>
              <div className="col-md-6">
                <div className=" p-4">
                  <input
                    name="lastName"
                    onChange={getContactData}
                    placeholder="Last name"
                    className="form-control rounded-5"
                    type="text"
                  />
                  {errorList?.filter(el=>el.context.label=='lastName')[0]?<div className="alert alert-danger rounded-4 py-1 my-2">{errorList?.filter(el=>el.context?.label=='lastName')[0].message}</div>:''}

                </div>
              </div>
              <div className="col-md-6">
                <div className="firstName p-4">
                  <input
                    name="phone"
                    onChange={getContactData}
                    placeholder="Phone Number"
                    className="form-control rounded-5"
                    type="text"
                  />
                  {errorList?.filter(el=>el.context.label=='phone')[0]?<div className="alert alert-danger rounded-4 py-1 my-2">unexpected phone number</div>:''}

                </div>
              </div>
              <div className="col-md-6">
                <div className="firstName p-4">
                  <input
                    name="email"
                    onChange={getContactData}
                    placeholder="Email"
                    className="form-control rounded-5"
                    type="text"
                  />
                  {errorList?.filter(el=>el.context.label=='email')[0]?<div className="alert alert-danger rounded-4 py-1 my-2">{errorList?.filter(el=>el.context?.label=='email')[0].message}</div>:''}
                  {error?<div className="alert alert-danger rounded-4 py-1 my-2">Email is already Exist</div>:''}
                </div>
              </div>
            </div>
            <div className="control d-flex justify-content-between p-4">
              <div className="cancel">
                <Link
                  to="/firsttask"
                  className="btn btn-dark text-light px-5 rounded-5 fs-6"
                >
                  Cancel
                </Link>
              </div>
              <div className="save">
                <button
                  type="submit"
                  className="btn btn-info text-light px-5 rounded-5 fs-6"
                >
                  {isLoading?<i className="fas fa-spin fa-spinner"></i> :"Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
