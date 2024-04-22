import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

import { useEffect, useState } from 'react';

import { requestAllCities } from '../../utils/api'
import  City  from '../../components/City';

interface ICityDefault {
  id: number;
  nome: string;
  uf: string;
}

export default function HomeScreen() {
  const [cities , setCities] = useState<ICityDefault[]|[]>([]);
  const [citiesForPages , setCitiesForPages] = useState<ICityDefault[]|[]>([]);
  const [citiesForPagesSearch , setCitiesForPagesSearch] = useState<ICityDefault[]|[]>([]);
  const [pagesNumber , setPagesNumber] = useState<number>(1);
  const [seach , setSeach] = useState<string>('');

  useEffect(() => {
    requestApiCity()
  }, []);

  useEffect(() => {
    setCitiesForPages(citiesForPagesSearch.slice((pagesNumber * 10) - 10 , pagesNumber * 10));
  }, [pagesNumber]);

  useEffect(() => {
    const citiesFiltredForSeach = cities.filter(
      (currCity:ICityDefault) => currCity.nome.slice(0, seach.length).toLowerCase() == seach.toLowerCase()
    );
    setPagesNumber(1);
    setCitiesForPagesSearch(citiesFiltredForSeach);
    setCitiesForPages(citiesFiltredForSeach.slice(0, 10));
  }, [seach]);

  async function requestApiCity() {
    const response = await requestAllCities();
    setCities(response);
    setCitiesForPages(response.slice(pagesNumber - 1, pagesNumber + 10));
    setCitiesForPagesSearch(response);
  }

  return(
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={seach}
            onChangeText={setSeach}
            placeholder="Pesquisar"
            />
        </View>
        {
          citiesForPages.map((city:ICityDefault) => {
            return(
              <City key={city.id} name={city.nome} uf={city.uf} cityId={city.id} />
            )
          })
        }

        <View style={styles.viewButton}>
          <Pressable
            style={styles.buttomPrevius}
            onPress={() => pagesNumber > 1 && setPagesNumber(pagesNumber - 1)}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </Pressable>
          
          <Text style={styles.pageNumber}>{pagesNumber}</Text>
          
          <Pressable
            style={styles.buttomPrevius}
            onPress={() =>  {
              citiesForPagesSearch.length/(10 * pagesNumber) > 1 && setPagesNumber(pagesNumber + 1)}}
          >
            <Text style={styles.buttonText}>proximo</Text>
          </Pressable>
        </View>
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

  viewButton:{
    flexDirection: 'row',
  },
  buttomPrevius: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  pageNumber: {
    fontSize: 16,
    marginHorizontal: 10,
  },

  searchContainer: {
    width: 300,
    margin: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});


