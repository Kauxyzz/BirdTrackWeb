import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

type Granja = {
  id: string;
  nome: string;
  localizacao: string;
};

export default function ListaGranjas() {
  const [granjas, setGranjas] = useState<Granja[]>([]);
  const router = useRouter();

  const carregarGranjas = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'granjas'));
      const lista: Granja[] = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      })) as Granja[];
      setGranjas(lista);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar granjas.');
    }
  };

  const excluirGranja = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'granjas', id));
      setGranjas((prev) => prev.filter((g) => g.id !== id));
      Alert.alert('Sucesso', 'Granja excluída.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir.');
    }
  };

  useEffect(() => {
    carregarGranjas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Granjas</Text>
      <FlatList
        data={granjas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/granjas/${item.id}`)}
            onLongPress={() => excluirGranja(item.id)}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardText}>{item.localizacao}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Nova Granja" onPress={() => router.push('/granjas/nova')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { color: '#555' },
});
