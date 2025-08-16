import "./App.css";
import AboutUs from "./Components/AboutUs/AboutUs";
import Banner from "./Components/Banner/Banner";
import CallToAction from "./Components/CallToAction/CallToAction";
import Categories from "./Components/Categories/Categories";
import MeetPets from "./Components/MeetPets/MeetPets";
import PetCareResources from "./Components/Resources/Resources";
import WhyUs from "./Components/WhyUs/WhyUs";
import Login from "./Pages/Login/Login";
import Reviews from "./Reviews/Reviews";

function App() {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <CallToAction></CallToAction>
      <MeetPets></MeetPets>
      <AboutUs></AboutUs>
      <PetCareResources></PetCareResources>
      <WhyUs></WhyUs>
      <Reviews></Reviews>
    </div>
  );
}

export default App;
