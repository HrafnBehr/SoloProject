import logo from './logo.svg';
import  React, {useState, useEffect} from 'react'
import './App.css';

function App(){

  const [starShipList, setStarShipList] = useState([])
  const [selectedStarship, setSelectedStarship] = useState({})

// takes in a function here
  useEffect(()=>{
    fetch(`https://swapi.dev/api/starships/`)
      .then(res => res.json())
      .then(data => {
        setStarShipList(data.results)
        // console.log(data)
      });
  })

  function shipChangeHandler(event){

    console.log(event.target.value)
  }

  return(
  <>
    <h1>Starship Sellers Anonymous</h1>
    <select onChange={shipChangeHandler}>

      {
        starShipList.map((ship) => {
          return <option>{`${ship.name}`}</option>
        })
      }
    </select>
    {
      selectedStarship.name ?
        <h2>Name: {`${selectedStarship.name}`}</h2>
        : <p>Please choose a valid option</p>
    }
  </>
  )
}

export default App;