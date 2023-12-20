import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./museums.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMuseum from "../../components/cardMuseums/CardMuseums";
import pic1  from "../../static/museums/1.jpg";
import pic2  from "../../static/museums/2.jpg";
import pic3  from "../../static/museums/3.jpg";
import pic4  from "../../static/museums/4.jpg";
import pic5  from "../../static/museums/5.jpg";
import pic6  from "../../static/museums/6.jpg";
import pic7  from "../../static/museums/7.jpg";
import pic8  from "../../static/museums/8.jpg";
import pic9  from "../../static/museums/9.jpg";
import pic10 from "../../static/museums/10.jpg";
import pic11 from "../../static/museums/11.jpg";

const Museums = () => {
    const [museumsData, setMuseumsData] = useState([]);
    const [type, setType] = useState("museums");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const allImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11];

    const [selectedImages, setSelectedImages] = useState([]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/museums/museums`)
            .then((response) => response.json())
            .then((data) => setMuseumsData(data))
            .catch((error) => console.error("Error fetching data:", error));

        if (location.state && location.state.headerType) {
            setType(location.state.headerType);
        }

        const selectRandomImages = () => {
            let shuffled = allImages
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                .slice(0, 9);

            setSelectedImages(shuffled);
        };

        selectRandomImages();

    }, [location]);

    const cardsPerRow = 3;


    const rows = [];
    for (let i = 0; i < 9; i += cardsPerRow) {
        rows.push(museumsData.slice(i, i + cardsPerRow));
    }

    console.log("OKKKKKK00");
    console.log(museumsData);

    return (
        <div>
            <Navbar />
            <Header type={type} />

            <div className="museumsContainer">
                <h1 className="museumsTitle">Discover unique places</h1>

                {rows.map((row, rowIndex) => (
                    <div className="museumsFeatured" key={rowIndex}>
                        {row.map((museum, cardIndex) => (
                            <CardMuseum
                                key={cardIndex}
                                imageUrl={selectedImages[rowIndex * cardsPerRow + cardIndex]}
                                museum={museum}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Museums;
