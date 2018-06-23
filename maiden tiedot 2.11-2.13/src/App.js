import React from 'react';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filter: '',
        showAll: true
      }
    }
    
    componentDidMount() {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.setState({ countries: response.data })
        })
    }
    
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    clickHandler = (country) => {
      return () => this.setState({ filter: country})
    }
    
    render() {
      const found = this.state.countries.filter(country => 
        country.name
          .toLowerCase()
          .includes(this.state.filter.toLowerCase())
      )

      const countriesToShow = 
        found.length > 10 
          ? "too many matches, specify another filter"
          : ( found.length === 1
            ? <div>
                <h1>{found[0].name}</h1>
                <p>capital: {found[0].capital}</p>
                <p>population: {found[0].population}</p>
                <img src={found[0].flag} alt="Flag" height={200}/>
              </div>
            : found.map(country => 
              <div 
                onClick={this.clickHandler(country.name)} 
                key={country.name}>
                {country.name}
              </div> 
            )
          )
      
      return (
        <div>
          <form>
            find countries: 
            <input 
              onChange={this.handleFilterChange} 
              value={this.state.filter}
            />
          </form>
          {countriesToShow}
        </div>
      )
    }
}

export default App
