import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function NovoDocumento() {
  const [nome, setNome] = useState("");
  const [vencimento, setVencimento] = useState("");
  const router = useRouter();

  const handleSalvar = async () => {
    if (!nome || !vencimento) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      await addDoc(collection(db, "documentos"), {
        nome,
        dataVencimento: vencimento,
      });
      Alert.alert("Sucesso", "Documento salvo com sucesso");
      router.replace("/documentos");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o documento");
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/documentos")}> 
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Cadastrar Documento</Text>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nome do documento"
            placeholderTextColor="#ccc"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de vencimento (AAAA-MM-DD)"
            placeholderTextColor="#ccc"
            value={vencimento}
            onChangeText={setVencimento}
          />
          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 25,
  },
  input: {
    backgroundColor: "#ffffffdd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginBottom: 20,
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
