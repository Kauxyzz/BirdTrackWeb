import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "expo-router";

export default function NovoMonitoramento() {
  const [data] = useState(new Date().toISOString().split("T")[0]);
  const [mortalidade, setMortalidade] = useState("");
  const [mediaPeso, setMediaPeso] = useState("");
  const [status, setStatus] = useState("");
  const [abate, setAbate] = useState("");
  const [observacao, setObservacao] = useState("");
  const router = useRouter();

  const salvarRegistro = async () => {
    if (!mortalidade || !mediaPeso || !status || !abate) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await addDoc(collection(db, "monitoramento"), {
        data,
        mortalidade,
        mediaPeso,
        status,
        abate,
        observacao,
      });
      Alert.alert("Sucesso", "Registro salvo com sucesso!");
      router.replace("/monitoramento");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o registro.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/FundoLogin.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/monitoramento")}> 
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Novo Registro</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={data}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Mortalidade (quantidade)"
            placeholderTextColor="#ccc"
            value={mortalidade}
            onChangeText={setMortalidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Média de Peso (kg)"
            placeholderTextColor="#ccc"
            value={mediaPeso}
            onChangeText={setMediaPeso}
          />
          <TextInput
            style={styles.input}
            placeholder="Status"
            placeholderTextColor="#ccc"
            value={status}
            onChangeText={setStatus}
          />
          <TextInput
            style={styles.input}
            placeholder="Abate"
            placeholderTextColor="#ccc"
            value={abate}
            onChangeText={setAbate}
          />
          <TextInput
            style={styles.input}
            placeholder="Observação"
            placeholderTextColor="#ccc"
            value={observacao}
            onChangeText={setObservacao}
          />
          <TouchableOpacity style={styles.button} onPress={salvarRegistro}>
            <Text style={styles.buttonText}>SALVAR REGISTRO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
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
