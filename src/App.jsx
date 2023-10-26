
import './App.css';
import Contacts from './components/Contacts/Contacts';
import AddUser from './components/AddUser/AddUser';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import UpdateContact from './components/UpdateContact/UpdateContact';
const router =createBrowserRouter([{
  path:"/firsttask",element:<Layout/>,children:[
    {index:true,element:<Contacts/>},
    {path:"adduser",element:<AddUser/>},
    {path:"updateContact/:id",element:<UpdateContact/>},
  ]
},    {path:"*",element:<NotFound/>},])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
