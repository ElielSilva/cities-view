import { Link, Navigator, useNavigation } from "expo-router";
import { StyleSheet, Text, View,TextInput,Button, Pressable } from 'react-native';


import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faledTryLogin, setFaledTryLogin] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    setFaledTryLogin(false);
  },
    [email, password]
  );

  useEffect(() => {
    if(isLoged) {
      setTimeout(() => {
        //@ts-ignore
        navigate.navigate("home/index");
      }, 1);
    }
  },
  [isLoged]
);

  const isValidEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function validateLogin () {

    if (email === "a@a.c" && password === "123456") {
      setIsLoged(true);
    } else {
      setFaledTryLogin(true);
      setIsLoged(false);
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Cities View</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email"
      />
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="senha"
      />
      {faledTryLogin && <Text style={{color:'red'}}>Login ou senha inválido!</Text>}
      <Pressable style={styles.button}
        
        onPress={() => validateLogin()}
        disabled={!isValidEmail(email) && !(password.length < 5)}
      >
        <Text style={styles.TextButton}> entrar </Text>
      </Pressable>
      <View style={styles.separator} />
      <Link href={"/home"}>home</Link>
      <Link href={"/citydetails"}>city details</Link>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: 'blueviolet',
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderColor: 'blueviolet',
    borderWidth:1,
    borderRadius:10,
    width: '80%',
    fontSize: 18,
    height: 40,
    margin: 12,
    padding: 10,
  },
  button: {
    backgroundColor: 'blueviolet',
    width: '80%',
    margin: 10,
    padding: 10,
    borderRadius:10,
    alignItems: 'center',
  },
  TextButton: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
  }
});
