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
import { auth } from "@/firebase/config";
import { updateEmail, updatePassword } from "firebase/auth";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleAtualizarPerfil = async () => {
    try {
      if (email) await updateEmail(auth.currentUser!, email);
      if (senha) await updatePassword(auth.currentUser!, senha);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    }
  };

  const handleExcluirConta = async () => {
    try {
      await auth.currentUser?.delete();
      Alert.alert("Conta excluída");
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a conta.");
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

        <TextInput
          style={styles.input}
          placeholder="Novo nome"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Novo e-mail"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleAtualizarPerfil}>
          <Text style={styles.buttonText}>ATUALIZAR PERFIL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluirConta}>
          <Text style={styles.buttonText}>EXCLUIR CONTA</Text>
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
    justifyContent: "center",
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
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: "#cc0000",
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
