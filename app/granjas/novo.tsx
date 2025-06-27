import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';

export default function NovaGranja() {
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const router = useRouter();

  const salvar = async () => {
    if (!nome || !localizacao) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await addDoc(collection(db, 'granjas'), { nome, localizacao });
      Alert.alert('Sucesso', 'Granja cadastrada!');
      router.replace('/granjas');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Localização" value={localizacao} onChangeText={setLocalizacao} style={styles.input} />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#f9f9f9' },
});
