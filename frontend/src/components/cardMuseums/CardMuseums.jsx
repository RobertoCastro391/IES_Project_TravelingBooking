import React from 'react';
import { useNavigate } from 'react-router-dom';


const CardMuseum = ({ imageUrl, title, museum }) => {
  const city = museum;
  const navigate = useNavigate();

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

      navigate("/museumscity", {state: { museums:  data , city: city } });
    } catch (error) {
      console.error("Failed to fetch flights:", error);
    }
  };


  const handleSearch = () => {
    fecthMuseums();
    // navigate("/museumscity");
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
