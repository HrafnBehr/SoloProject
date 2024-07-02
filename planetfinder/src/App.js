import logo from './logo.svg';
import  React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [starShipList, setStarShipList] = useState([]);
  const [selectedStarship, setSelectedStarship] = useState();

  useEffect(() => {
    const fetchAllStarships = async () => {
      let starships = [];
      let url = `https://swapi.dev/api/starships/`;

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        starships = starships.concat(data.results);
        url = data.next;
      }

      setStarShipList(starships);
    };

    fetchAllStarships();
  }, []);

  function shipChangeHandler(event){
    const selectedShip  = starShipList.find(
      (ship) => ship.name === event.target.value
    );
      setSelectedStarship(selectedShip)
  }

  function myPopupFunction() {
    alert('Congratulations and thank you for your credits!')
  }

  if(starShipList.length === 0){
    console.log('Please wait')
    return <p>Please wait...</p>
  }
  return(
  <>
    <h1>Kuat Drive-Yards</h1>
    <select onChange={shipChangeHandler}>
      {
        starShipList.map((ship) => {
          return <option key={ship.name}>{`${ship.name}`}</option>
        })
      }
    </select>
    {
      selectedStarship ? (
      <div>
        <h2>Name: {`${selectedStarship.name}`}</h2>
        <h3>Manufacturer:{`${selectedStarship.manufacturer}`}</h3>
        <h3>Ship Class: {`${selectedStarship.starship_class}`}</h3>
        <h3>Cost: {`${selectedStarship.cost_in_credits}`}</h3>
        <h3>Length: {`${selectedStarship.length}`}</h3>
        <h3>Crew Size: {`${selectedStarship.crew}`}</h3>
        <h3>Passengers: {`${selectedStarship.passengers}`}</h3>
        <h3>Cargo Capacity: {`${selectedStarship.cargo_capacity}`}</h3>
        <h3>Max Atmospheric Speed: {`${selectedStarship.max_atmosphering_speed}`}</h3>
        <h3>Hyperdrive Rating: {`${selectedStarship.hyperdrive_rating}`}</h3>
        <button onClick={myPopupFunction} className="button">Purchase</button>
      </div>
       ) : ( <p>Please choose a valid option</p>
    )}
  </>
  )
}

export default App;