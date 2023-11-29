import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { faEarth, faHotel, faTrain } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      
      <div className="homeContainer">
      <div className="boxContainer">
          <div className="box">
            <FontAwesomeIcon icon={faTrain} />
            <p>Trains</p>
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faHotel} />
            <p>Hotels</p>
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faEarth} />
            <p>Explore Everywhere</p>
          </div>
      </div>
        <Featured/>
        <h1 className="homeTitle">Discover various stays</h1>
        <PropertyList/>
        <h1 className="homeTitle">Our costumers loved</h1>
        <FeaturedProperties/>
      </div>
      <Footer/>
    </div>
    
  );
}; 

export default Home;
