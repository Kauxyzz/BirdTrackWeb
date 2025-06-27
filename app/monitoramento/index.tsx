// Substituir o conteúdo de monitoramento/index.tsx por esse

import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface Registro {
  id: string;
  data: string;
  mortalidade: number;
  mediaPeso: string;
  status: string;
  abate: string;
  observacao: string;
  numeroGranja?: string;
}

export default function MonitoramentoIndex() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [registroEditado, setRegistroEditado] = useState<Partial<Registro>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "monitoramento"));
        const lista: Registro[] = [];

        querySnapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          lista.push({
            id: docSnapshot.id,
            data: data.data ?? "",
            mortalidade: data.mortalidade ?? 0,
            mediaPeso: data.mediaPeso ?? "",
            status: data.status ?? "",
            abate: data.abate ?? "",
            observacao: data.observacao ?? "",
            numeroGranja: data.numeroGranja ?? "",
          });
        });

        setRegistros(lista);
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
      }
    };

    fetchRegistros();
  }, []);

  const handleDelete = (id: string) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Você tem certeza que deseja excluir este registro?");
      if (!confirmed) return;
      deleteDoc(doc(db, "monitoramento", id))
        .then(() => setRegistros((prev) => prev.filter((registro) => registro.id !== id)))
        .catch((err) => console.error("Erro ao excluir registro:", err));
    } else {
      Alert.alert(
        "Excluir Registro",
        "Você tem certeza que deseja excluir este registro?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              try {
                await deleteDoc(doc(db, "monitoramento", id));
                setRegistros((prev) => prev.filter((registro) => registro.id !== id));
              } catch (error) {
                console.error("Erro ao excluir registro:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleSalvar = async (id: string) => {
    try {
      await updateDoc(doc(db, "monitoramento", id), {
        ...registroEditado,
      });

      setRegistros((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, ...registroEditado } as Registro : reg
        )
      );

      setEditandoId(null);
      setRegistroEditado({});
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/FundoLogin.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/dashboard")}> 
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <FlatList
          data={registros}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {editandoId === item.id ? (
                <>
                  {Object.entries({
                    data: "Data",
                    numeroGranja: "Número da Granja",
                    mortalidade: "Mortalidade",
                    mediaPeso: "Média de Peso",
                    status: "Status",
                    abate: "Abate",
                    observacao: "Observação"
                  }).map(([key, label]) => (
                    <View key={key}>
                      <Text style={styles.label}>{label}:</Text>
                      <TextInput
                        style={styles.input}
                        value={String((registroEditado as any)[key] ?? "")}
                        onChangeText={(text) => setRegistroEditado(prev => ({ ...prev, [key]: text }))}
                      />
                    </View>
                  ))}

                  <TouchableOpacity style={styles.editButton} onPress={() => handleSalvar(item.id)}>
                    <Text style={styles.editButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.label}>Data:</Text>
                  <Text>{item.data}</Text>
                  <Text style={styles.label}>Número da Granja:</Text>
                  <Text>{item.numeroGranja}</Text>
                  <Text style={styles.label}>Mortalidade:</Text>
                  <Text>{item.mortalidade}</Text>
                  <Text style={styles.label}>Média de Peso:</Text>
                  <Text>{item.mediaPeso}</Text>
                  <Text style={styles.label}>Status:</Text>
                  <Text>{item.status}</Text>
                  <Text style={styles.label}>Abate:</Text>
                  <Text>{item.abate}</Text>
                  <Text style={styles.label}>Observação:</Text>
                  <Text>{item.observacao}</Text>

                  <View style={styles.cardButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setEditandoId(item.id);
                        setRegistroEditado(item);
                      }}
                    >
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/monitoramento/novo")}
        >
          <Text style={styles.buttonText}>+ Novo Registro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#003366",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#990000",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginBottom: 10,
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
