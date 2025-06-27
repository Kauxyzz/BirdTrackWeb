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

interface Documento {
  id: string;
  titulo: string;
  vencimento: string;
}

export default function DocumentosIndex() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [vencimentoEditado, setVencimentoEditado] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documentos"));
        const docs = querySnapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data();
          return {
            id: docSnapshot.id,
            titulo: data.nome ?? "Sem título",
            vencimento: data.dataVencimento ?? "Sem data",
          };
        }) as Documento[];
        setDocumentos(docs);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };

    fetchDocumentos();
  }, []);

  const handleDelete = (id: string) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Você tem certeza que deseja excluir este documento?");
      if (!confirmed) return;
      deleteDoc(doc(db, "documentos", id))
        .then(() => setDocumentos((prev) => prev.filter((doc) => doc.id !== id)))
        .catch((err) => console.error("Erro ao excluir documento:", err));
    } else {
      Alert.alert(
        "Excluir Documento",
        "Você tem certeza que deseja excluir este documento?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              try {
                await deleteDoc(doc(db, "documentos", id));
                setDocumentos((prev) => prev.filter((doc) => doc.id !== id));
              } catch (error) {
                console.error("Erro ao excluir documento:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleSalvarEdicao = async (id: string) => {
    try {
      await updateDoc(doc(db, "documentos", id), {
        nome: tituloEditado,
        dataVencimento: vencimentoEditado,
      });

      setDocumentos((prev) =>
        prev.map((doc) =>
          doc.id === id
            ? { ...doc, titulo: tituloEditado, vencimento: vencimentoEditado }
            : doc
        )
      );
      setEditandoId(null);
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar edição.");
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

        <Text style={styles.title}>Documentos</Text>
        <FlatList
          data={documentos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {editandoId === item.id ? (
                <>
                  <TextInput
                    style={styles.cardInput}
                    value={tituloEditado}
                    onChangeText={setTituloEditado}
                    placeholder="Título"
                  />
                  <TextInput
                    style={styles.cardInput}
                    value={vencimentoEditado}
                    onChangeText={setVencimentoEditado}
                    placeholder="Vencimento"
                  />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleSalvarEdicao(item.id)}
                  >
                    <Text style={styles.editButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardText}>Vence em: {item.vencimento}</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setEditandoId(item.id);
                        setTituloEditado(item.titulo);
                        setVencimentoEditado(item.vencimento);
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
          onPress={() => router.push("/documentos/novo")}
        >
          <Text style={styles.buttonText}>NOVO DOCUMENTO</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
  cardInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
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
