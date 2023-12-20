import React from 'react';
import { useNavigate } from 'react-router-dom';


const CardMuseum = ({ imageUrl, title, museum }) => {

  const city = museum;
  const navigate = useNavigate();

  //antigo funcionava mas faz repetição de cidades
  // const fecthMuseums = async () => {
  //   try {

  //     console.log("City Name")
  //     console.log(city)

  //     const url = `${process.env.REACT_APP_API_URL}/api/museums/museumscity/${city}`;
      
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     console.log("Data")
  //     console.log(data);

  //     navigate("/museumscity", {state: { museums:  data , city: city } });
  //   } catch (error) {
  //     console.error("Failed to fetch flights:", error);
  //   }
  // };


  //este é para testar sempre cidades diferentes e não haver repetição nos cards
  const fecthMuseums = async () => {
    try {
       console.log("City Name")
       console.log(city)
   
       const url = `${process.env.REACT_APP_API_URL}/api/museums/museumscity/${city}`;
       
       const response = await fetch(url, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         }
       });
   
       if (!response.ok) {
         throw new Error(`Error: ${response.status}`);
       }
   
       const data = await response.json();
   
       console.log("Data")
       console.log(data);
   
       // Create a Set object to store city names
       const uniqueCities = new Set();
   
       // Iterate over the museums data
       data.forEach(museum => {
         // Add each city name to the Set object
         uniqueCities.add(museum.city);
       });
   
       // Convert the Set object back to an array
       const uniqueCitiesArray = Array.from(uniqueCities);
   
       // Pass the uniqueCitiesArray as state
       navigate("/museumscity", {state: { museums: data , city: uniqueCitiesArray } });
    } catch (error) {
       console.error("Failed to fetch flights:", error);
    }
   };


  const handleSearch = () => {
    fecthMuseums();
  };

  return (
    <div className="museumCard" onClick={handleSearch}>
      <div className="museumCardTitle">
        <h1>{city}</h1>
      </div>
    </div>
  );
};

export default CardMuseum;
