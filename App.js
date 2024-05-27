import Home from "./Home";
import TestGetPV from "./interface/testGetPV";
import Startstack from "./interface/startstack";
import { NavigationContainer } from "@react-navigation/native";
import EnvoiDeDonneer from "./EnvoiDeDonneer";


const App = () => {

  return (

    <NavigationContainer>
         <Startstack/>
     </NavigationContainer>
    //<EnvoiDeDonneer/>
    
  );
};



export default App;
