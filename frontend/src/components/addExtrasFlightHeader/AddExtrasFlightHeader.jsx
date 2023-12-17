import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  faPerson,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./addExtrasFlightHeader.css";

const AddExtrasFlightHeader = ({isRoundTrip=null, flightOptions=null}) => {
  
  const flightDestination  = localStorage.getItem("flightDestination");
  
  return (
    <div className="headerAddOptionsFlight">
      <div>{flightDestination}</div>
        {flightOptions && flightOptions.adult !== undefined && flightOptions.children !== undefined && isRoundTrip !== null ? (
          <div className="subtitle" style={{justifyContent: 'center', fontSize: '14px', marginTop: '1%'}}>
            <div style={{ marginRight: '10px' }}>
              <FontAwesomeIcon icon={faPerson} style={{ marginRight: '3px' }}/>
              {flightOptions.adult} Adultos
              <FontAwesomeIcon icon={faChild} style={{ marginRight: '3px', marginLeft: '10px' }}/>
              {flightOptions.children} Children
            </div>
            <div style={{ marginRight: '10px',}}>|</div>
            <div>
              { isRoundTrip === false ? "One Way" : "Round Trip"}
            </div>
            <div style={{ marginLeft: '10px',marginRight: '10px'}}>|</div>
            <div>
              {flightOptions.class}
            </div>
          </div>  
        ) : (
          <div className="subtitle">Loading...</div>
        )}
    </div>
  );
};



export default AddExtrasFlightHeader;
