import { useState, useEffect } from "react";
import personService from "./services/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [newfilter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    console.log("effect");

    personService.getAllPersons().then((returnedList) => {
      setPersons(returnedList);
    });
  };
  useEffect(hook, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const deletePerson = (id) => {
    let deletedPerson = persons.find((person) => person.id == id);
    console.log(deletedPerson.id);
    if (window.confirm(`Delete person with id ${id}?`)) {
      personService.deletePerson(id).then(() => {
        let updatedList = persons.filter((person) => person.id !== id);

        setPersons(updatedList);
        setErrorMessage(`Person '${deletedPerson.name}' was deleted`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!persons.some((persons) => persons["name"] === newName)) {
      console.log("Nimeä ei löytynyt");
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.createPerson(personObject).then((returnedPerson) => {
        console.log("Person added", returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setErrorMessage(`Person '${returnedPerson.name}' was added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
      setNewName("");
      setNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const PersonsToShow = () => {
    const filtered = persons.filter((person) =>
      person.name.includes(newfilter)
    );
    return filtered;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <FilterRow filter={newfilter} changeHandler={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm
        addPersonHandler={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <NumberList list={PersonsToShow()} deletePerson={deletePerson} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addPersonHandler}>
        <div>
          name:{" "}
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const NumberList = (props) => {
  const personList = props.list;

  return (
    <>
      <ul>
        {personList.map((person) => (
          <ListRow
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            deletePerson={props.deletePerson}
          />
        ))}
      </ul>
    </>
  );
};

const ListRow = (props) => {
  return (
    <>
      <li key={props.id}>
        {props.name} {props.number}{" "}
        <button onClick={() => props.deletePerson(props.id)}>Delete</button>
      </li>
    </>
  );
};

const FilterRow = (props) => {
  return (
    <>
      <form>
        filter: <input value={props.filter} onChange={props.changeHandler} />
      </form>
    </>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default App;
