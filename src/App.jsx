import "./App.css";
import AboutUs from "./Components/AboutUs/AboutUs";
import Banner from "./Components/Banner/Banner";
import CallToAction from "./Components/CallToAction/CallToAction";
import Categories from "./Components/Categories/Categories";
import PetCareResources from "./Components/Resources/Resources";
import Login from "./Pages/Login/Login";
import Reviews from "./Reviews/Reviews";

function App() {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <CallToAction></CallToAction>
      <AboutUs></AboutUs>
      <PetCareResources></PetCareResources>
      <Reviews></Reviews>
    </div>
  );
}

export default App;
