import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Seance1 from './seance1';
import Seance2 from './seance2';
import { SignatureProvider } from './navigation/signaturerep/signaturecontexr';

const Stack=createNativeStackNavigator();


export default function PV({route}) {
  const ipAdress = route.params.ipAdress;
  return (
   <SignatureProvider>
         <Stack.Navigator initialRouteName='Seance1' screenOptions={{headerShown:false}}>
            <Stack.Screen name="Seance1" component={Seance1} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="Seance2" component={Seance2} initialParams={{ipAdress:ipAdress}}/>
         </Stack.Navigator>
    </SignatureProvider>

    
  );
}

