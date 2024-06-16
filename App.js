import Home from "./Home";
import TestGetPV from "./interface/testGetPV";
import Startstack from "./interface/startstack";
import { NavigationContainer } from "@react-navigation/native";
import EnvoiDeDonneer from "./EnvoiDeDonneer";
import SendData from './interface/navigation/data/SendData'
import GetPhoto from "./GetPhoto";


const App = () => {

  return (

    // <NavigationContainer>
    //      <Startstack/>
    //  </NavigationContainer>
    //<EnvoiDeDonneer/>
    <SendData />
    //<GetPhoto />
    //<TestGetPV />
  );
};
export default App;
