import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

interface cityProps {
  name: String;
  cityId:  Number;
};

export default function City(props: cityProps) {
  const { name, cityId } = props;
  //console.log( name, cityId )
  return (
    <View style={styles.container}>
      <Link href={`/citydetails/${cityId}`}>
        <Text>{name} / {cityId.toString()}</Text>
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderBottomWidth: 2,
    borderColor: "#e2e0e0",
    borderRadius:26
  },
});