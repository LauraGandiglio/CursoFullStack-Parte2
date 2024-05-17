import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const names = persons.map((name) => name.name);
  const addPerson = (e) => {
    e.preventDefault();

    if (names.includes(newName)) {
      const oldPerson = persons[names.indexOf(newName)];
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...oldPerson, number: newNumber };
        personsService.update(oldPerson.id, updatedPerson).catch((error) => {
          setErrorMessage("This contact was already deleted from server");
          personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
          });
        });
        setPersons(
          persons.map((person) =>
            person.id !== oldPerson.id ? person : updatedPerson
          )
        );
        setNewName("");
        setNewNumber("");

        setErrorMessage(`${oldPerson.name}'s number modified successfully`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personsService.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");

        setErrorMessage(`${newPerson.name} added successfully`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }).catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      });
    }
  };

  const deletePerson = (id, name) => {
    console.log(persons);
    if (window.confirm(`delete ${name}?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      personsService.remove(id);

      setErrorMessage(`Contact removed successfully`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        deletePerson={deletePerson}
        persons={persons}
        newFilter={newFilter}
      />
    </div>
  );
};

export default App;
