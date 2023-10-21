import logo from './logo.svg';
import './App.css';
import Contacts from './components/Contacts/Contacts';
import AddUser from './components/AddUser/AddUser';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
const router =createBrowserRouter([{
  path:"/firsttask",element:<Layout/>,children:[
    {index:true,element:<Contacts/>},
    {path:"adduser",element:<AddUser/>},
  ]
}])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
