import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          role: 'user',
          createdAt: new Date().toISOString()
        });
        return false;
      }
      
      return userDoc.data()?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const adminStatus = await checkAdminStatus(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    
    // Create user document
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: name,
      role: 'user',
      createdAt: new Date().toISOString()
    });
  };

  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const adminStatus = await checkAdminStatus(user);
    setIsAdmin(adminStatus);
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const adminStatus = await checkAdminStatus(user);
    setIsAdmin(adminStatus);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    loading,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};