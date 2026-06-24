import { db, auth, handleFirestoreError, OperationType } from "./firebase.ts";
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { UserProgress } from "../types.ts";

export const saveProgressToFirestore = async (progress: UserProgress) => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);
  try {
    // Only save the non-collection properties
    const data = {
      uid: userId,
      email: auth.currentUser.email || "",
      level: progress.level || 1,
      xp: progress.xp || 0,
      xpToNextLevel: progress.xpToNextLevel || 100,
      totalFocusSeconds: progress.totalFocusSeconds || 0,
      dailyStreak: progress.dailyStreak || 0,
      lastActiveDate: progress.lastActiveDate || "",
      masteredTermsCount: progress.masteredTermsCount || 0,
      completedStudiesCount: progress.completedStudiesCount || 0,
      unlockedAchievements: progress.unlockedAchievements || [],
      quizHistory: progress.quizHistory || [],
    };
    await setDoc(userRef, data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}`);
  }
};

export const loadProgressFromFirestore = async (): Promise<Partial<UserProgress> | null> => {
  if (!auth.currentUser) return null;
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProgress>;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    return null;
  }
};

export const syncJournalEntries = (setEntries: (entries: any[]) => void) => {
  if (!auth.currentUser) return () => {};
  const userId = auth.currentUser.uid;
  const q = collection(db, `users/${userId}/journalEntries`);
  return onSnapshot(q, (snapshot) => {
    const entries: any[] = [];
    snapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });
    // Sort by date descending
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setEntries(entries);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, `users/${userId}/journalEntries`);
  });
};

export const addJournalEntry = async (entry: any) => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;
  const ref = doc(db, `users/${userId}/journalEntries`, entry.id);
  try {
    await setDoc(ref, {
      ...entry,
      userId,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${userId}/journalEntries/${entry.id}`);
  }
};

export const deleteJournalEntry = async (id: string) => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;
  const ref = doc(db, `users/${userId}/journalEntries`, id);
  try {
    await deleteDoc(ref);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${userId}/journalEntries/${id}`);
  }
};
