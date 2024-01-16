import { useEffect } from 'react';
import './App.css';
import { getAllByDisplayValue } from '@testing-library/react';
import { useContext } from 'react';
import ChipContext from './Context/ChipContext';
import YourComponent from './Components/YourComponent';
import Lance from './Components/Lance';
function App() {

  const { selectedContacts ,setSelectedContacts ,unSelectedContacts ,setUnSelectedContacts } = useContext(ChipContext)

  useEffect(() => {
    console.log(unSelectedContacts);
  }, [])
  return (
    <>
      ------YourComponent------
      <YourComponent /> 
      <br/>
      <br/>
      <br/>
      <br/>
      ------lance------
      <Lance/>
    </>
  );
}

export default App;
