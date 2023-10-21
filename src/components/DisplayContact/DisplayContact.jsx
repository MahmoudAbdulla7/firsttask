import React from "react";
export default function DisplayContact({contact}) {
  // mfe4 api update wla delete
  return (
<>
      <div className="row d-flex contact">
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
            <button className="fa-solid w-50 fa-pen-to-square my-4 fs-3 mx-2 text-info bg-light p-2 btn"></button>
            <button className="fa-solid w-50 fa-trash-can fs-3 my-4 mx-2 text-danger bg-light p-2 btn"></button>
          </div>
        </div>
      </div>
      <div className="border-top my-2 border-1"></div>
    </>
  );
}
