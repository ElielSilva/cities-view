import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { useEffect, useState } from 'react';

import  City  from '../../components/City';

export default function HomeScreen() {
  const [cities , setCities] = useState([]);
  const [citiesForPages , setCitiesForPages] = useState([]);
  const [pagesNumber , setPagesNumber] = useState(1);
  const [seach , setSeach] = useState('');
  
  const [ isLoading , setIsLoading ] = useState(true);
  
  async function name() {
    
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
    
    const responseFromJson = await response.json();
    setCities(responseFromJson);
    setCitiesForPages(responseFromJson.slice(pagesNumber - 1, pagesNumber + 10));
    
    //
    //console.log(responseFromJson.slice(0,10));
    //console.log(responseFromJson[0].microrregiao);
  }
  useEffect(() => {
    setIsLoading(true);
    
    name()
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setCitiesForPages(cities.slice((pagesNumber * 10) - 10 , pagesNumber * 10));
    
    
    setIsLoading(false);
  }, [pagesNumber]);

  useEffect(() => {
    setIsLoading(true);
    
    
    setIsLoading(false);
  }, [seach]);

 


  return(
    <View >
      <View >
      <View >
        <TextInput 
          style={{backgroundColor:'blue'}}
          value={seach}
          onChangeText={setSeach}
          defaultValue={seach}
          placeholder="Pesquisar"
        />
      </View>
        {seach.length ?
        seach && cities.filter((currCity:any) => currCity.nome === seach.slice(0, seach.length)).slice(0,10)
          : citiesForPages.map((city:any) => {
          //console.log(city.nome, city.id);
          return(
            <City key={city.id} name={city.nome} cityId={city.id} />
          );
        })}

        { 
          seach && cities.filter((currCity:any) => currCity.nome === seach.slice(0, seach.length)).slice(0,10) 
        }
        
        <Button
          title="<"
          onPress={() => pagesNumber>1 && setPagesNumber(pagesNumber - 1)}
        />
        <Text>{pagesNumber}</Text>
        <Button
          title=">"
          onPress={() => setPagesNumber(pagesNumber + 1)}
          
        />
      </View>
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


