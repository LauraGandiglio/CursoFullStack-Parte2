
const Persons = ({ persons, newFilter, deletePerson }) => {
  
  return (
    <>
      {persons.map((person) =>
        person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1 ? (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={()=> deletePerson(person.id, person.name)}>Delete</button>
          </p>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default Persons;
