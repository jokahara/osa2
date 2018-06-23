import React from 'react'
import Osa from "./Osa";

const Sisalto = ({ props }) => {
    return (
      <div>
        {props.osat.map(prop => 
            <Osa key={prop.id} props={prop}/>
        )}
      </div>
    )
}

export default Sisalto