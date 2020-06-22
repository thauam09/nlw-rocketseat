import React, {useState, useEffect} from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, Picker} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Home = () => {
  const navigation = useNavigation();

  const [selectedUf, setSelectedUf] = useState('Selecione a UF');
  const [selectedCity, setSelectedCity] = useState('Selecione a Cidade');
  const [ufItems, setUfItems] = useState<DropdownItems[]>([]);
  const [citiesItems, setCitiesItems] = useState<DropdownItems[]>([]);

  interface DropdownItems{
    label: string;
    value: string;
    key: string;
  }

  interface IBGEUFResponse {
    sigla: string;
  }
  
  interface IBGECityResponse{
    nome:  string;
  }

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      selectedUf,
      selectedCity
    });
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map((uf => uf.sigla));
      ufInitials.sort();

      const ufsOrganized = ufInitials.map((uf => ({ label: uf, value: uf, key: uf })));

      setUfItems(ufsOrganized);
    });

  }, []);

  useEffect(() => {
    //Carregar cidades toda vez que mudar UF
    
    if(selectedUf === 'Selecione a UF'){
      return;
    }

    axios.
      get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
      .then(response => {
      const cities = response.data.map((city => city.nome));
      
      const citiesOrganized = cities.map((city => ({label: city, value: city, key: city})));

      setCitiesItems(citiesOrganized);
    });

    
  }, [selectedUf]);

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>


      <View style={styles.footer}>

        <RNPickerSelect
          style={styles}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => setSelectedUf(value)}
          value={selectedUf}
          placeholder={{label: 'Selecione a UF:', value: ''}}
          items={ufItems}
        />
        
        <RNPickerSelect
          style={styles}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => setSelectedCity(value)}
          value={selectedCity}
          placeholder={{label: 'Selecione a Cidade:', value: ''}}
          items={citiesItems}
        />

        {/* <Picker
          style={styles.picker}
          itemStyle={styles.picker}
          selectedValue={selectedUf}
          onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}
        >

          {Ufs.map(uf => (
            <Picker.Item value={uf} label={uf} key={uf} />
          ))}

        </Picker>

        <Picker
          style={styles.picker}
          itemStyle={styles.picker}
          selectedValue={selectedCity}
          onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
        >
          
          {cities.map(city => (
            <Picker.Item value={city} label={city} key={city} />
          ))}
        </Picker> */}

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;