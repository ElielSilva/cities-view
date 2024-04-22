import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

interface cityProps {
  name: String;
  uf:  String;
  cityId: number;
};

export default function City(props: cityProps) {
  const { name, uf, cityId } = props;
  return (
    <View style={styles.container}>
      <Link href={`/citydetails/${cityId}`}>
        <Text style={styles.text}>{name} - {uf}</Text>
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blueviolet',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderBottomWidth: 2,
    borderColor: "#e2e0e0",
    borderRadius:20,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text:{
    fontWeight: 'bold',
  }
});