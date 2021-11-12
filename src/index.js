import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from 'react-modal';

import { listPets, createPet } from "./api";

import Pet from './Pet';
import NewPetModal from './NewPetModal';

import "./index.css";

const App = () => {
const [pets, setPets] = useState([]);
const [isLoading, setLoading] = useState([]);
const [isNewPetOpen, setNewPetOpen] = useState(false);

useEffect(() => {
  setLoading(true);
  listPets()
    .then((pets) => setPets(pets))
    .finally(() => setLoading(false));
}, []);

const addPet = async (pet) => {
  return createPet(pet).then((newPet) => {
    setPets([...pets, newPet]);
    setNewPetOpen(false);
  });
};

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
{ isLoading ? (
  <div className='loading'>Loading...</div>
) : (
    <>
    <ul>
    {pets.map ( (pet) => (
      <li key={pet.id}>
        <Pet pet={pet} />
      </li>
    ))}
  </ul>
  <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
  </>
) }

  {isNewPetOpen && (
    <NewPetModal
      // isOpen={isNewPetOpen}
      onSave={addPet}
      onCancel={() => setNewPetOpen(false)}
    />
  )}
    </main>
  );
};

// ReactDOM.render(<App />, document.querySelector("#root"));
const el = document.querySelector("#root");
Modal.setAppElement(el);
ReactDOM.render(<App />, el);
