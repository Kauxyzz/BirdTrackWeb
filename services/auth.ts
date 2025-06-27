import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  User,
} from 'firebase/auth';

import { auth } from '@/firebase/config';

// Cadastro de usuário
export const register = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

// Login
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Atualizar perfil do usuário logado
export const updateUserProfile = async ({
  name,
  email,
  password,
}: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  if (name) await updateProfile(user, { displayName: name });
  if (email) await updateEmail(user, email);
  if (password) await updatePassword(user, password);
};

export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteUser(user);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
