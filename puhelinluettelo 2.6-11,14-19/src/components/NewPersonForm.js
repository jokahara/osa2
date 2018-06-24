import React from 'react';

const NewPersonForm = ({ state, addNumber, newNameHandler, newNumberHandler }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        nimi: <input 
          value={state.newName}
          onChange={newNameHandler}/>
      </div>
      <div>
        numero: <input 
          value={state.newNumber}
          onChange={newNumberHandler}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default NewPersonForm