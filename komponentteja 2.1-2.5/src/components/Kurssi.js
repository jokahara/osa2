import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto';
import Yhteensa from "./Yhteensa";

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko props = {kurssi}/>
      <Sisalto props = {kurssi}/>
      <Yhteensa props = {kurssi}/>
    </div>
  )
}

export default Kurssi