import { StyleSheet, Text, View,Image, ImageBackground } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import  { apiCounty }  from "../../utils/api";

interface IResponseAPI {
  municipio: string,
  estado: string,
  historico: string,
}

export default function CityDetails() {
  const [ currentCounty, setCurrentCounty ] = useState<IResponseAPI>({
    municipio: "não cerregado",
    estado: "não cerregado",
    historico: "não cerregado",  
  });

  const { id } = useLocalSearchParams();
  const image = {uri: '../../../assets/iconeCidade.png'};


  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCounty(Number(id));

      setCurrentCounty(response)
      
      
    }
    fetchData()
  },[])

  return (
    <View style={styles.container}>
      <View style={{}}>
      <ImageBackground source={image} resizeMode="cover" >
        <View style={styles.header}>
          <Text>{currentCounty.municipio}</Text>
          <Text>{currentCounty.estado}</Text>

        </View>
      </ImageBackground>
        <Image source={require('../../../assets/iconeCidade.png')} />
        
      </View>


      <View style={styles.bodyText}>
        <Text>{currentCounty.historico}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'blue',
    color: "red",
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius:26,
  },
  bodyText: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopEndRadius:26,
    borderTopLeftRadius:26,
    padding: 15,
  }
});
