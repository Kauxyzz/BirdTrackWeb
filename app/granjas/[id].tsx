import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

type Granja = {
  id: string;
  nome: string;
  localizacao: string;
};

export default function DetalheGranja() {
  const { id } = useLocalSearchParams();
  const [granja, setGranja] = useState<Granja | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const buscarGranja = async () => {
    try {
      const docRef = doc(db, 'granjas', String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGranja({ id: docSnap.id, ...docSnap.data() } as Granja);
      } else {
        Alert.alert('Erro', 'Granja não encontrada.');
        router.back();
      }
    } catch (e) {
      Alert.alert('Erro', 'Falha ao buscar granja.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) buscarGranja();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!granja) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Granja não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{granja.nome}</Text>
      <Text style={styles.subtitulo}>Localização: {granja.localizacao}</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 18, color: '#555', marginBottom: 20 },
  erro: { textAlign: 'center', marginTop: 40, fontSize: 16, color: 'red' },
});
