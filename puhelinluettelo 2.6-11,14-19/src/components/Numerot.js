import React from 'react';

const Numerot = ({ persons, filter, removeHandler }) => {
  return (
    <table>
    <tbody>
      {persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(person => 
        <tr key={person.id}> 
          <td>{person.name}</td> 
          <td>{person.number}</td> 
          <td><button onClick={removeHandler(person.id)}>poista</button></td>
        </tr>
      )}
    </tbody>
    </table>
  )
}

export default Numerot