import { StyleSheet, Text, View,Image, ImageBackground, SafeAreaView, ScrollView  } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import React from 'react';
import  { requestInformationCity }  from "../../utils/api";
import testei from '../../../assets/iconeCidade.png'

interface IResponseAPI {
  municipio: string,
  estado: string,
  historico: string,
  prefeito: string,
  densidade: string,
  populacao: string,
}

export default function CityDetails() {
  const [ currentCounty, setCurrentCounty ] = useState<IResponseAPI>({
    municipio: "não cerregado",
    estado: "não cerregado",
    historico: "não cerregado",
    prefeito: "não cerregado",
    populacao: "não cerregado",
    densidade: "não cerregado",

  });

  const { id } = useLocalSearchParams();
  const image = {uri: '../../../assets/iconeCidade.png'};
  let logo = require('../../../assets/icone.png');


  useEffect(() => {
    const fetchData = async () => {
      const response = await requestInformationCity(Number(id));

      setCurrentCounty(response)
      
      
    }
    fetchData()
  },[])
  return (
    <View style={styles.container}>
        <SafeAreaView >
          <ScrollView >
        <View style={styles.main}>    
            <ImageBackground source={testei}  imageStyle={styles.image}>
            
              <View style={
                {
                  height: 'auto', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blueviolet', shadowColor: "#000",
                  padding: 15,
                  marginTop:50,
                  marginBottom:100
                }
                }>
                  <Text style={{color: "white"}}>{currentCounty.municipio}</Text>
                  <Text style={{color: "white"}}>{currentCounty.estado}</Text>
              </View>
            </ImageBackground>
          
            <View style={styles.bodyText}>
              <Text>Prefeito: {currentCounty.prefeito}</Text>
              <Text>População: {currentCounty.populacao}</Text>
              <Text>Densidade: {currentCounty.densidade}</Text>
              <View style={styles.separator}></View>
              <Text>{currentCounty.historico}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  main: { 
    width: "90%",
    height: "90%",
    margin: 10,
    borderRadius: 26,
    
  },
  header: {
    //justifyContent: 'center',
    width: '100%',
    backgroundColor: "blueviolet"
  },
  bodyText: {
    //padding: 15,
  },
  image: {
    borderRadius: 26,
    resizeMode: 'stretch'
  },
  separator: {
    marginVertical: 30,
    height: 1,
   // width: '80%',
  },
});
