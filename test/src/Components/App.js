import React from 'react';
import './App.css';
import Form from './Form';
import "bootstrap/dist/css/bootstrap.min.css";
import FetchData from './Data';
import Exget from './EXget';
import Count from './count';
import Toggletext from './Name';
import Todo from './Todo';
import FetchGet from './Fetchget';
import SearchFilter from './Search';
import FormTest from './FormTest';
import GetData from './GetData';
import DebouncedSearch from './SearchDebounce';
import Pagination from './Pagination';
import MultiStepForm from './StepFotm';
import DragDropList from './DragDrop';
import DarkMode from './DarkMode';
import StorageExample from '../../../restApis/src/ComponentsAPI/LocalSession';


function App() {
  return (
    <div>
      {/* <Toggletext/>
      <Form/>
      <FetchData/>
      <Exget/>*/}
      {/* <Count/>  */}
      {/*  */}
      {/* <FetchGet/> */}
      {/* <SearchFilter/> */}
      {/* <FormTest/> */}
      {/* <DebouncedSearch/> */}
      {/* <Todo/>
      <GetData/> */}
      <Pagination/>
      <MultiStepForm/>
      <DarkMode/>
      <StorageExample/>
    </div>
  );
}

export default App;
