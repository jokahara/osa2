// Puhelinluettelo
import React from 'react';
import Numerot from "./components/Numerot";
import FilterForm from './components/FilterForm';
import NewPersonForm from './components/NewPersonForm';
import Notification from "./components/Notification";
import personService from "./services/persons";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notice: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  changeHandler = (key) => {
    return (event) => this.setState({ [key]: event.target.value })
  }

  // lisää tai muuttaa numeroa
  addNumber = (event) => {
    event.preventDefault()
    
    const newName = this.state.newName
    const newNumber = this.state.newNumber
  
    const person = this.state.persons
    .find(p => p.name.toLowerCase() === newName.toLowerCase())
  
    person === undefined
      ? this.newPerson(newName, newNumber)
        & this.notice(`Lisättiin ${newName}`)
      : (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`) 
        ? this.changeNumber(person, newName, newNumber)
          & this.notice(`Muutettiin ${person.name}n numero`)
        : null 
      )

    this.setState({
        newName: '',
        newNumber: ''
    })
  }

  // muuttaa numeroa (tai lisää uuden henkilön virhetilanteessa)
  changeNumber = (person, newName, newNumber) => {
    personService
      .update(person.id, {
        ...person,
        number: newNumber
      })
      .then(changedPerson => {
        const persons = this.state.persons.filter(person => person.id !== changedPerson.id)
        this.setState({ persons: persons.concat(changedPerson) })
      })
      .catch(error => {
        this.setState({
          persons: this.state.persons.filter(p => p.name !== newName)
        })
        this.newPerson(newName, newNumber)
      })
  }

  // lisää uuden henkilön
  newPerson = (name, number) => {
    personService
      .create({ 
        name, 
        number,
        id: this.state.persons[this.state.persons.length-1].id + 1
      })
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson)
        })
      })
  }

  // poistaa henkilön
  removeHandler = (id) => {
    return () => {
      const person = this.state.persons.find(p => p.id === id)

      if (window.confirm(`Poistetaanko ${person.name}?`)) {
        personService
          .remove(id)
          .then(response => 
            this.setState({
              persons: this.state.persons.filter(p => p.id !== id)
            })
          )
        this.notice(`${person.name} poistettiin`)
      }
    }
  }

  // muuttaa ilmoitusta
  notice = (message) => {
    this.setState({ notice: message })

    setTimeout(() => {
      this.setState({ notice: null })
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.notice}/>

        <FilterForm handler={this.changeHandler('filter')}/>

        <h2>Lisää uusi / muuta olemassaolevan numeroa</h2>
        <NewPersonForm 
          state={this.state}
          addNumber={this.addNumber}
          newNameHandler={this.changeHandler('newName')}
          newNumberHandler={this.changeHandler('newNumber')}  
        />

        <h2>Numerot</h2>
        <Numerot 
          persons={this.state.persons} 
          filter={this.state.filter}
          removeHandler={this.removeHandler}
        />
      </div>
    )
  }
}

export default App