import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Tipagens
export interface Documento {
  id?: string;
  nome: string;
  dataVencimento: string;
}

export interface Monitoramento {
  id?: string;
  data: string;
  mortalidade: number;
  mediaPeso: number;
  status: string;
  abate: string;
  observacao: string;
}

// Os exports, módulos de funções do Firebase para manipular dados no Firestore.

export const api = {
  async getDocumentos(): Promise<Documento[]> {
    const querySnapshot = await getDocs(collection(db, "documentos"));
    return querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as Documento[];
  },
//Funcoes para documentos
  async addDocumento(doc: Omit<Documento, "id">): Promise<Documento> {
    const docRef = await addDoc(collection(db, "documentos"), doc);
    return { id: docRef.id, ...doc };
  },

  async deleteDocumento(id: string) {
    await deleteDoc(doc(db, "documentos", id));
  },

  async updateDocumento(id: string, dados: Partial<Documento>) {
    await updateDoc(doc(db, "documentos", id), dados);
  },
//Funcoes para monitoramentos
  async getMonitoramentos(): Promise<Monitoramento[]> {
    const querySnapshot = await getDocs(collection(db, "monitoramento"));
    return querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as Monitoramento[];
  },

  async addMonitoramento(reg: Omit<Monitoramento, "id">): Promise<Monitoramento> {
    const docRef = await addDoc(collection(db, "monitoramento"), reg);
    return { id: docRef.id, ...reg };
  },

  async deleteMonitoramento(id: string) {
    await deleteDoc(doc(db, "monitoramento", id));
  },

  async updateMonitoramento(id: string, dados: Partial<Monitoramento>) {
    await updateDoc(doc(db, "monitoramento", id), dados);
  },
};
