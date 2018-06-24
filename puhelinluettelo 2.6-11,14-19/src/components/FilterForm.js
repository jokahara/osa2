import React from 'react';

const FilterForm = ({ handler }) => {
  return (
    <form>
        rajaa näytettäviä <input onChange={handler}/>
    </form>
  )
}

export default FilterForm