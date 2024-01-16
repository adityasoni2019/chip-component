import React, { useState } from 'react';
import './YourComponent.css'; // Import your CSS file
import { useContext } from 'react';
import ChipContext from '../Context/ChipContext';
const YourComponent = () => {

  const { selectedContacts, setSelectedContacts, unSelectedContacts, setUnSelectedContacts } = useContext(ChipContext)
  const [selectedChipIndex, setSelectedChipIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setSelectedChipIndex(null); // Clear selection when input changes
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    console.log(typeof inputValue);
    if (event.key === 'Backspace') {
      if(inputValue=== undefined){}
      else if (inputValue.trim().length === 0) {
        // Backspace pressed with empty input
        if (selectedChipIndex === null) {
          // No chip selected, select the last one
          const lastIndex = selectedContacts.length - 1;
          setSelectedChipIndex(lastIndex);
        } else {
          // Chip selected, delete it
          deleteSelectedChip();
          setSelectedChipIndex(null);
        }
      }
    }
  };

  const deleteSelectedChip = () => {
    // this function will delete the last chip, and add that to the unSelectedContacts
    const lastItem = selectedContacts[selectedContacts.length - 1];
    setUnSelectedContacts(unSelectedContacts => [...unSelectedContacts, lastItem]);
    setSelectedContacts(selectedContacts => selectedContacts.slice(0, -1));
  };

  const renderChips = () => {
    return selectedContacts.map((item, index) => (
      <div
        key={item.id}
        className={`chip ${selectedChipIndex === index ? 'selected' : ''}`}
      >
        {item.name}
        <div></div>
      </div>
    ));
  };

  const onClickInput = () => {
    setSelectedChipIndex(null);
  }

  const addSelectedElements = (selected_contact_id) => {
    // this function will remove the element from the unselectedArray, and add them to the selectedArray
    const contact = unSelectedContacts.find(c => c.id === selected_contact_id);

    if (contact) {
      setSelectedContacts(unSelectedContacts => [...unSelectedContacts, contact]);
      setUnSelectedContacts(unSelectedContacts => unSelectedContacts.filter(c=> c.id!== selected_contact_id));
    }
  }

  return (
    <div>
      <div>
        {renderChips()}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onClick={onClickInput}
          placeholder="Type something..."
        />

        <div>
          
          <div>
            {unSelectedContacts
              .filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
              .map((item, index) => {
                // Check if inputValue is empty
                if (inputValue===undefined || !inputValue) {
                  // If inputValue is empty, render the name without bold formatting
                  return (
                    <div key={item.id} onClick={() => addSelectedElements(item.id)}>
                      {item.name}
                    </div>
                  );
                } else {
                  // If inputValue is not empty, split and render with bold formatting for matched parts
                  const regex = new RegExp(`(${inputValue})`, 'gi');
                  const parts = item.name.split(regex);

                  return (
                    <div key={item.id} onClick={() => addSelectedElements(item.id)}>
                      {parts.map((part, partIndex) =>
                        regex.test(part)
                          ? <b key={partIndex}>{part}</b>
                          : part
                      )}
                    </div>
                  );
                }
              })}
          </div>


        </div>
      </div>
    </div>
  );
};

export default YourComponent;
