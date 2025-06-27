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
      />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 30,
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
    paddingHorizontal: 35,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#660000",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
