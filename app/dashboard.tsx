import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
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
          <View style={styles.container}>
            <Text style={styles.title}>Gestão Avícola</Text>

            <Link href="/documentos" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Documentos</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/monitoramento" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Monitoramento de Produção</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/perfil" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Alterar Perfil</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#990000",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
