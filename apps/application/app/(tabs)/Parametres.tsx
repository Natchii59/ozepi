import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';

export default function Parametres() {
  const [toggleOn, setToggleOn] = useState(true);

  return (

    <View style={styles.container}>
    {/* Paramètres */}
    <Text style={styles.pageTitle}>Paramètres</Text>

    <View style={styles.section}>
      <Text style={styles.title}>None</Text>
      <TextInput style={styles.input} placeholder="Text" />
    </View>

      <View style={styles.section}>
        <Text style={styles.title}>Chevron</Text>
        <TextInput style={styles.input} placeholder="Text" />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Select</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="Text" />
          <TextInput style={styles.inputSmall} placeholder="Value" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Toggle ON</Text>
        <Switch
          value={toggleOn}
          onValueChange={() => setToggleOn(previousState => !previousState)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={toggleOn ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Select</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="Text" />
          <TextInput style={styles.inputSmall} placeholder="Value" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Select</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="Text" />
          <TextInput style={styles.inputSmall} placeholder="Value" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Select</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="Text" />
          <TextInput style={styles.inputSmall} placeholder="Value" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Select</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="Text" />
          <TextInput style={styles.inputSmall} placeholder="Value" />
        </View>
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
