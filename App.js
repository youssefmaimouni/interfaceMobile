
import { StyleSheet } from "react-native";
import TestGetPV from "./interface/testGetPV";
import Startstack from "./interface/startstack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";

const App = () => {

  return (

    <NavigationContainer>
         <Startstack/>
     </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  docText: {
    fontSize: 18,
    marginVertical: 5,
  },
  image:{
    flex:1,
    justifyContent: "center"
  }
});

export default App;
