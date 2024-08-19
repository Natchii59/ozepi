import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';

export default function Parametres() {
  const [toggleOn, setToggleOn] = useState(true);


  const handleLogout = () => {
    // Logique de déconnexion
    console.log('Déconnecté');
  };

  return (

    <View style={styles.container}>
    {/* Paramètres */}
    <Text style={styles.pageTitle}>Paramètres</Text>

    <View style={styles.section}>
      <Text style={styles.title}>Nom</Text>
      <TextInput style={styles.input} placeholder="Text" />
    </View>

      <View style={styles.section}>
        <Text style={styles.title}>Prénom</Text>
        <TextInput style={styles.input} placeholder="Text" />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Mail</Text>
        <TextInput style={styles.input} placeholder="Text" />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Dark mode</Text>
        <Switch
          value={toggleOn}
          onValueChange={() => setToggleOn(previousState => !previousState)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={toggleOn ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      

      <View style={styles.section}>
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    padding: 40,
    paddingTop: 80,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSmall: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '48%',
  },
});
