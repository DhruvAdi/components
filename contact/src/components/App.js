import React, { useState, useEffect, useContext, createContext} from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import Test from './Test'
import Myform from './Form';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Blogs from '../pages/Blogs';
import Contact from '../pages/Contact';
import "bootstrap/dist/css/bootstrap.min.css";
import NewForm from './NewForm';


function App() {
  const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, contact]);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) {

      setContacts(retriveContacts);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  const UserContext = createContext();
  function Component1() {
    const [user, setUser] = useState("dhruva");
    return (
      <>
        <UserContext.Provider value={user}>
          <h1>{`Hello ${user}!`}</h1>
          <Component2 />
        </UserContext.Provider>
      </>
    )
  }

  function Component2() {
    return (
      <>
        <h1>Component1</h1>
        <Component3  />
      </>
    )
  }

  function Component3() {
    const user = useContext(UserContext);
    return (
      <>
          <h1>Component 3</h1>
          <h2>{`Hello ${user} again!`}</h2>
      </>
    )
  }

  return (
    // <div className='ui container'>
    //   <Header />
    //   <AddContact addContactHandler={addContactHandler}/>
    //   <ContactList contacts ={contacts}/>
    //   <Test />
    //   <Myform />
    //   <div>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path='/' element={<Layout />}>
    //           <Route index element={<Home />} />
    //           <Route path='blogs' element={<Blogs />} />
    //           <Route path='contact' element={<Contact />} />
    //         </Route>
    //       </Routes>
    //     </BrowserRouter>
    //   </div>
    //   <Component1 />
    // </div>
    <div>
      <NewForm/>
    </div>
  );
}

export default App;
