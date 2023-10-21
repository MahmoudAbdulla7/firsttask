import DisplayContact from "../DisplayContact/DisplayContact";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
export default function Contacts() {
  const [contacts, setContacts] = useState();
  const [searchResult, setSearchResult] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setflag] = useState(false);
  async function getContacts() {
    const { data } = await Axios.get(
      `https://dummyapi.io/data/v1/user`,
      {
        headers: {
          "app-id": "64fc4a747b1786417e354f31",
        },
      }
    );
    setContacts(data.data);
  }
  useEffect(() => {
    getContacts();
  }, []);
  const indexOfLastContact = currentPage * 2;
  const indexOfFirstContact = indexOfLastContact - 2;
  const currentContacts = contacts? contacts.slice(indexOfFirstContact, indexOfLastContact): [];
  const searchContacts = searchResult? searchResult.slice(indexOfFirstContact, indexOfLastContact): [];
  // function for display next or prev page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // search
  function searchByName(eventInfo) {
    let name =eventInfo.target.value;
    let result= contacts?.filter(el=>el.firstName.toLowerCase().includes(name.toLowerCase()));
    setSearchResult(result);
    setflag(true);
    if (name=="") {
      setSearchResult(undefined);
      setflag(false)
    }
  }
  return (
    <>
      <div className="container">
        <div className="border border-1 rounded-4">
          <div className="displyDesign m-auto">
            <div className="search mt-4">
              <input
              onChange={searchByName}
                type="text"
                placeholder="search by name"
                className="form-control inpSrch rounded-5"
              />
            </div>
            <div className="addContact d-flex justify-content-end">
              <Link
                className="my-5 p-2 rounded-5 btn btn-info text-light"
                to="/firsttask/adduser"
              >
                <i className="fa-solid fa-plus me-2"></i>
                Add new contact
              </Link>
            </div>
            <div className="displayContacts container">
              {searchResult?.length?(searchContacts.map((contact, index) => (<DisplayContact key={index} contact={contact} />))):currentContacts?.map((contact, index) => (<DisplayContact key={index} contact={contact} />))||<Loading/>}
            </div>
          </div>
          <div className="paginate d-flex justify-content-end">
            <div className="me-5 text-light mt-4">
              {flag?"":contacts && (
                <Pagination
                  totalContacts={contacts.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}