import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/FundoLogin.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>

          <View style={styles.container}>
            <Text style={styles.title}>BirdTrack</Text>
            <Text style={styles.subtitle}>Acesse sua conta</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text style={styles.registerText}>
                Não tem uma conta? Crie uma agora.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#eee",
    textAlign: "center",
    marginBottom: 20,
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
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
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
