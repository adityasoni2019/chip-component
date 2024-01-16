import React, { useEffect, useRef, useState } from 'react';
import './YourComponent.css';
import { useContext } from 'react';
import ChipContext from '../Context/ChipContext';
import { ReactComponent as CloseIcon } from '../Utils/close-icon.svg';

const YourComponent = () => {

  const { selectedContacts, setSelectedContacts, unSelectedContacts, setUnSelectedContacts } = useContext(ChipContext)
  const [selectedChipIndex, setSelectedChipIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const myComponentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myComponentRef && !myComponentRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // for preventing memory leaks
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myComponentRef]);


  const handleInputChange = (event) => {
    setSelectedChipIndex(null); // Clear selection when input changes
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleKeyPress = (event) => {
    console.log(typeof inputValue);
    if (event.key === 'Backspace') {
      if (inputValue === undefined) { }
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
    if (lastItem) {
      setUnSelectedContacts(unSelectedContacts => [...unSelectedContacts, lastItem]);
      setSelectedContacts(selectedContacts => selectedContacts.slice(0, -1));
    }
  };

  const renderChips = () => {
    return selectedContacts.map((item, index) => (
      <div class='flex flex-wrap m-2 h-8 border border-black-700 rounded-full'>
        <div
          key={item.id}
          className={`chip ${selectedChipIndex === index ? 'selected' : ''}`}
        >
          {item.name}
        </div>
        <div onClick={() => handleDeleteSelected(item.id)}><CloseIcon /></div>
      </div>
    ));
  };


  const addSelectedElements = (selected_contact_id) => {
    // this function will remove the element from the unselectedArray, and add them to the selectedArray
    const contact = unSelectedContacts.find(c => c.id === selected_contact_id);

    if (contact) {
      setSelectedContacts(unSelectedContacts => [...unSelectedContacts, contact]);
      setUnSelectedContacts(unSelectedContacts => unSelectedContacts.filter(c => c.id !== selected_contact_id));
    }
    setShowDropdown(true);
  }

  const handleInputClick = () => {
    setShowDropdown(true);
    setSelectedChipIndex(null);
  };

  const handleDeleteSelected = (selected_contact_id) => {
    // this will remove elements from selected to unselected 
    const contact = selectedContacts.find(c => c.id === selected_contact_id);

    if (contact) {
      setUnSelectedContacts(selectedContacts => [...selectedContacts, contact]);
      setSelectedContacts(selectedContacts => selectedContacts.filter(c => c.id !== selected_contact_id));
    }
    setShowDropdown(true);
  }

  return (
    <div class="flex items-center justify-center p-4 ">
      <div class="w-[400px]" ref={myComponentRef}>
        <div class="border border-red-900">

          <div class= "flex flex-wrap ">
            {renderChips()}
          </div>
          <input
            class="border border-black-200 h-12 appearance-none w-full box-border"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onClick={handleInputClick}
            placeholder="Type something..."
          />

        </div>
        <div>

          <div class="border border-black-600 shadow-xl">

            {(showDropdown) && unSelectedContacts
              .filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
              .map((item, index) => {

                // Check if inputValue is empty
                if (inputValue === undefined || !inputValue) {
                  // If inputValue is empty, render the name without bold formatting
                  return (
                    <div class="flex h-12 p-4 justify-between hover:cursor-pointer hover:bg-slate-300" key={item.id} onClick={() => addSelectedElements(item.id)}>
                      {/* <div calss="font-black">{item.name + " " + item.email} </div> */}
                      <span class="font-bold">{item.name}</span>
                      <span>{" " + item.email}</span>
                      {/* <div>{item.email}</div> */}
                    </div>
                  );
                } else {
                  // If inputValue is not empty, split and render with bold formatting for matched parts
                  const regex = new RegExp(`(${inputValue})`, 'gi');
                  const parts = item.name.split(regex);
                  const parts_email = item.email.split(regex);
                  const nameParts = item.name.split(regex);
                  const emailParts = item.email.split(regex);
                  return (
                    <div class="flex h-12 p-4 justify-between hover:cursor-pointer hover:bg-slate-300" onClick={() => addSelectedElements(item.id)}>
                      {/* Rendering name with bold parts */}

                      <div >

                        {nameParts.map((part, partIndex) =>
                          regex.test(part) ? <b key={partIndex}>{part}</b> : part
                        )}
                      </div>

                      {/* Adding a space and @ symbol before the email */}

                      <div>

                        {/* Rendering email with bold parts */}
                        {emailParts.map((part, partIndex) =>
                          regex.test(part) ? <b key={partIndex}>{part}</b> : part
                        )}
                      </div>
                      {/* 
                      <div class="h-8 hover:cursor-pointer hover:bg-slate-300" key={item.id} onClick={() => addSelectedElements(item.id)}>
                        {parts.map((part, partIndex) =>
                          regex.test(part)
                            ? <b key={partIndex}>{part}</b>
                            : part
                        )}
                      </div>

                      <div class="h-8 hover:cursor-pointer hover:bg-slate-300" key={item.id} onClick={() => addSelectedElements(item.id)}>
                        {parts_email.map((part_email, partIndex) =>
                          regex.test(part_email)
                            ? <b key={partIndex}>{part_email}</b>
                            : part_email
                        )}
                      </div> */}
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
