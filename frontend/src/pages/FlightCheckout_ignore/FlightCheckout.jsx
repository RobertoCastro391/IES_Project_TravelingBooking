import React, { useState } from "react";
import "./flightcheckout.css";

const FlightCheckout = () => {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [cardName, setCardName] = useState('');
    // const [cardNumber, setCardNumber] = useState('');
    // const [expirationDate, setExpirationDate] = useState('');
    // const [securityCode, setSecurityCode] = useState('');
    // const [addressLine1, setAddressLine1] = useState('');
    // const [addressLine2, setAddressLine2] = useState('');
    // const [city, setCity] = useState('');
    // const [zipCode, setZipCode] = useState('');
    // const [country, setCountry] = useState('');
    // const [state, setState] = useState('');

    return (

        <div className="flight-checkout">
            <div className="passengers">
                {/* Conteúdo para a primeira coluna */}
                <p> ola passengers </p>
            </div>
            <div className="flights_details">
                {/* Conteúdo para a segunda coluna */}
                <p> ola flights details </p>

            </div>
        </div>


















        // <div className="fligth-checkout">
        //     <div className="passenger-details">
        //         <div className="div-3">
        //             <div className="div-4">
        //                 <div className="div-4">
        //                     <div className="div-5">
        //                         <div className="span-wrapper">
        //                             <div className="span">
        //                                 <div className="div-6">
        //                                     <img className="svg" alt="Svg" src="/img/svg-3.svg" />
        //                                     <p className="no-pressure-it-s">No pressure – it&#39;s free to cancel later.</p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="div-4">
        //                             <div className="div-7">
        //                                 <div className="p">
        //                                     <div className="span-2">
        //                                         <div className="text-wrapper-5">Passengers</div>
        //                                         <img className="img" alt="Svg" src="/img/svg-2.svg" />
        //                                     </div>
        //                                     <img className="svg" alt="Svg" src="/img/svg-1.svg" />
        //                                 </div>
        //                                 <p className="text-wrapper-6">Please enter the information about the passengers</p>
        //                                 <div className="div-5">
        //                                     <div className="div-8">
        //                                         <div className="text-wrapper-7">First name:</div>
        //                                         <div className="input-root-your">
        //                                             <input type="text" placeholder="Enter first name" />
        //                                         </div>
        //                                     </div>
        //                                     <div className="div-9">
        //                                         <div className="text-wrapper-7">Last name:</div>
        //                                         <div className="div-wrapper">
        //                                             <input type="text" placeholder="Enter last name" />
        //                                         </div>
        //                                         <div className="div-10">
        //                                             <div className="span-3">
        //                                                 <div className="div-11">
        //                                                     <div className="text-wrapper-9">Gender:</div>
        //                                                     <input type="text" placeholder="Enter gender" />
        //                                                 </div>
        //                                                 <div className="text-wrapper-10">Nationality:</div>
        //                                             </div>
        //                                             <div className="span-3">
        //                                                 <div className="dialing-code-wrapper">
        //                                                     <div className="dialing-code">
        //                                                         <div className="text-wrapper-11">Gender:</div>
        //                                                         <img className="image" alt="Image" src="/img/image-3.svg" />
        //                                                     </div>
        //                                                 </div>
        //                                                 <div className="overlap-group-2">
        //                                                     <div className="text-wrapper-12">Nationality:</div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="div-12">
        //                                         <div className="span-4">
        //                                             <div className="div-13">
        //                                                 <div className="text-wrapper-13">Date of Birth</div>
        //                                             </div>
        //                                             <div className="text-wrapper-14">Passport Number</div>
        //                                         </div>
        //                                         <div className="span-3">
        //                                             <div className="div-14">
        //                                                 <div className="dialing-code-2">
        //                                                     <input type="text" placeholder="DD/MM/YYYY" />
        //                                                 </div>
        //                                             </div>
        //                                             <div className="overlap-group-3">
        //                                                 <input type="text" placeholder="XXXXXXXXXX" />
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="div-12">
        //                                         <div className="span-4" />
        //                                         <div className="span-3">
        //                                             <div className="div-15">
        //                                                 <div className="dialing-code-3">
        //                                                     <div className="text-wrapper-17">Add more passengers</div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="div-16">
        //                                 <div className="text-wrapper-18">Booking contact</div>
        //                                 <div className="div-5">
        //                                     <div className="div-17">
        //                                         <div className="text-wrapper-19">Email</div>
        //                                         <p className="text-wrapper-20">
        //                                             We’ll send your booking confirmation to this email address. Make sure it’s correct.
        //                                         </p>
        //                                         <input type="email" placeholder="Enter email" />
        //                                     </div>
        //                                     <div className="div-18">
        //                                         <div className="text-wrapper-22">Phone number</div>
        //                                         <div className="span-3">
        //                                             <div className="overlap-group-4">
        //                                                 <div className="div-19">
        //                                                     <div className="dialing-code-4">
        //                                                         <div className="text-wrapper-11">PT +351</div>
        //                                                         <img className="image-2" alt="Image" src="/img/image-2.svg" />
        //                                                     </div>
        //                                                 </div>
        //                                                 <input type="tel" placeholder="Enter phone number" />
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="div-16">
        //                         <div className="text-wrapper-18">Payment details</div>
        //                         <div className="div-5">
        //                             <div className="div-8">
        //                                 <div className="text-wrapper-7">Name on card</div>
        //                                 <input type="text" placeholder="Name as appears on card" />
        //                             </div>
        //                             <div className="div-20">
        //                                 <div className="overlap-group-5">
        //                                     <div className="div-21">
        //                                         <div className="text-wrapper-13">Card types accepted</div>
        //                                         <div className="div-22">
        //                                             <img className="img-2" alt="Visa svg" src="/img/visa-6d11d0bb-svg.svg" />
        //                                             <img className="img-2" alt="Master card" src="/img/master-card-1cb10f91-svg.svg" />
        //                                             <div className="img-2" />
        //                                             <div className="img-2" />
        //                                         </div>
        //                                         <p className="text-wrapper-23">Your card issuer may charge a fee.</p>
        //                                         <div className="div-23">
        //                                             <p className="text-wrapper-24">Card information is fully encrypted and protected.</p>
        //                                             <div className="a">
        //                                                 <img className="frame-2" alt="Frame" src="/img/frame-5.svg" />
        //                                                 <div className="text-wrapper-25">Secure payment</div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="text-wrapper-26">Card number</div>
        //                                     <input type="text" placeholder="Enter card number" />
        //                                 </div>
        //                                 <div className="div-24" />
        //                             </div>
        //                             <div className="div-8">
        //                                 <div className="text-wrapper-22">Expiration date</div>
        //                                 <div className="input-root-payment-2">
        //                                     <input type="text" placeholder="MM/YY" />
        //                                 </div>
        //                             </div>
        //                             <div className="div-25">
        //                                 <div className="text-wrapper-9">Security code</div>
        //                                 <input type="text" placeholder="Enter security code" />
        //                                 <img className="i" alt="I" src="/img/i.svg" />
        //                             </div>
        //                             <div className="div-5">
        //                                 <div className="div-27">
        //                                     <div className="text-wrapper-27">Address Line 1</div>
        //                                     <input type="text" placeholder="Enter address line 1" />
        //                                 </div>
        //                                 <div className="div-27">
        //                                     <div className="text-wrapper-27">Address Line 2</div>
        //                                     <input type="text" placeholder="Enter address line 2" />
        //                                 </div>
        //                                 <div className="div-27">
        //                                     <div className="text-wrapper-27">Town / city</div>
        //                                     <input type="text" placeholder="Enter town / city" />
        //                                 </div>
        //                                 <div className="div-27">
        //                                     <div className="text-wrapper-9">Zip code</div>
        //                                     <input type="text" placeholder="Enter zip code" />
        //                                 </div>
        //                                 <div className="div-8">
        //                                     <div className="text-wrapper-22">Country / Region</div>
        //                                     <input type="text" placeholder="Enter country / region" />
        //                                 </div>
        //                                 <div className="div-8">
        //                                     <div className="text-wrapper-22">State</div>
        //                                     <input type="text" placeholder="Enter state" />
        //                                 </div>
        //                             </div>
        //                             <button className="button">
        //                                 <div className="text-wrapper-29">Book</div>
        //                             </button>
        //                             <div className="by-continuing-you-wrapper">
        //                                 <p className="by-continuing-you">
        //                                     <span className="text-wrapper-30">By continuing you agree to our </span>
        //                                     <span className="text-wrapper-31">Terms of Service</span>
        //                                     <span className="text-wrapper-30"> &amp; </span>
        //                                     <span className="text-wrapper-31">Privacy Policies</span>
        //                                     <span className="text-wrapper-30"> and Trip.com </span>
        //                                     <span className="text-wrapper-31">Terms and Conditions</span>
        //                                     <span className="text-wrapper-30"> &amp; </span>
        //                                     <span className="text-wrapper-31">Privacy Policies</span>
        //                                     <span className="text-wrapper-30">.</span>
        //                                 </p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="flight-details">
        //                         <div className="div-28">
        //                             <div className="div-29">
        //                                 <div className="div-30">
        //                                     <div className="div-31">
        //                                         <div className="div-32">
        //                                             <div className="text-wrapper-32">Fligth details</div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="div-33">
        //                                         <div className="div-34">
        //                                             <div className="div-35">
        //                                                 <div className="text-wrapper-33">Vistara + Emirates</div>
        //                                                 <div className="div-36">
        //                                                     <div className="div-37">
        //                                                         <div className="text-wrapper-34">4:50 PM</div>
        //                                                         <div className="text-wrapper-35">DEL</div>
        //                                                     </div>
        //                                                     <div className="div-38">
        //                                                         <div className="text-wrapper-36">25h 20m</div>
        //                                                         <div className="div-39">
        //                                                             <div className="text-wrapper-37">2 stops</div>
        //                                                             <div className="div-40">
        //                                                                 <div className="text-wrapper-38">BOM</div>
        //                                                                 <div className="span-5">
        //                                                                     <div className="text-wrapper-39">,</div>
        //                                                                     <div className="text-wrapper-38">DXB</div>
        //                                                                 </div>
        //                                                             </div>
        //                                                         </div>
        //                                                         <div className="div-41">
        //                                                             <div className="span-6" />
        //                                                             <div className="span-7" />
        //                                                             <img className="svg-layer" alt="Svg layer" src="/img/svg-layer-1-1.svg" />
        //                                                         </div>
        //                                                     </div>
        //                                                     <div className="div-42">
        //                                                         <div className="div-43">
        //                                                             <div className="text-wrapper-40">8:40 AM</div>
        //                                                             <div className="text-wrapper-41">+1</div>
        //                                                         </div>
        //                                                         <div className="text-wrapper-6">IAD</div>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                             <div className="div-44">
        //                                                 <div className="div-45" />
        //                                                 <div className="div-36">
        //                                                     <div className="div-46">
        //                                                         <div className="text-wrapper-42">10:55 AM</div>
        //                                                         <div className="text-wrapper-43">IAD</div>
        //                                                     </div>
        //                                                     <div className="div-47">
        //                                                         <div className="text-wrapper-36">18h 20m</div>
        //                                                         <div className="div-48">
        //                                                             <div className="text-wrapper-37">1 stop</div>
        //                                                             <div className="text-wrapper-38">DXB</div>
        //                                                         </div>
        //                                                         <div className="div-41">
        //                                                             <div className="span-8" />
        //                                                             <img className="svg-layer" alt="Svg layer" src="/img/svg-layer-1.svg" />
        //                                                         </div>
        //                                                     </div>
        //                                                     <div className="div-49">
        //                                                         <div className="div-50">
        //                                                             <div className="text-wrapper-40">2:45 PM</div>
        //                                                             <div className="text-wrapper-44">+1</div>
        //                                                         </div>
        //                                                         <div className="text-wrapper-6">DEL</div>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="div-51">
        //                                         <div className="div-52">
        //                                             <div className="div-53">
        //                                                 <div className="text-wrapper-22">Check-in</div>
        //                                                 <div className="text-wrapper-45">Tue, Nov 14, 2023</div>
        //                                             </div>
        //                                             <div className="div-54">
        //                                                 <div className="text-wrapper-22">Check-out</div>
        //                                                 <div className="text-wrapper-45">Wed, Nov 15, 2023</div>
        //                                             </div>
        //                                         </div>
        //                                         <div className="div-52">
        //                                             <div className="div-55">
        //                                                 <div className="text-wrapper-22">Guests</div>
        //                                                 <div className="text-wrapper-46">2 adults</div>
        //                                             </div>
        //                                             <div className="div-56">
        //                                                 <div className="text-wrapper-22">Stay</div>
        //                                                 <div className="text-wrapper-45">1 night</div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="div-57">
        //                                     <div className="div-58">
        //                                         <div className="div-5">
        //                                             <div className="div-59">
        //                                                 <div className="text-wrapper-47">Fligth</div>
        //                                                 <div className="text-wrapper-47">2,399€</div>
        //                                             </div>
        //                                             <div className="div-60">
        //                                                 <div className="div-61">
        //                                                     <div className="text-wrapper-47">1 Extra luggage</div>
        //                                                     <div className="text-wrapper-48">59.60€</div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                         <div className="div-62">
        //                                             <div className="div-63">
        //                                                 <div className="text-wrapper-18">Total</div>
        //                                                 <div className="text-wrapper-49">2458.60€</div>
        //                                             </div>
        //                                         </div>
        //                                         <div className="div-64" />
        //                                     </div>
        //                                 </div>
        //                                 <div className="div-65">
        //                                     <div className="div-66">
        //                                         <div className="div-67">
        //                                             <img className="svg-2" alt="Svg" src="/img/svg.svg" />
        //                                             <div className="text-wrapper-50">Free cancellation</div>
        //                                         </div>
        //                                         <p className="free-cancellation">
        //                                             Free cancellation before 11:59 PM on Mar 25, 2023 (local time of hotel). After that, you&#39;ll be
        //                                             charged 100% of the cost.
        //                                         </p>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default FlightCheckout;