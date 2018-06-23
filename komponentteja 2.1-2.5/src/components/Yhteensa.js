import React from 'react'

const Yhteensa = ({ props }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.tehtavia;

    return (
      <div>
        <p>yhteensä {props.osat.reduce(reducer, 0)} tehtävää</p>
      </div>
    )
}

export default Yhteensa