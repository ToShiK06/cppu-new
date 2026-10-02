import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

// ---------- Заявки (leads) ----------
export async function submitLead(payload) {
  return addDoc(collection(db, "leads"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function getLeads() {
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function subscribeLeads(callback) {
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function updateLeadStatus(id, status) {
  return updateDoc(doc(db, "leads", id), { status });
}

export async function deleteLead(id) {
  return deleteDoc(doc(db, "leads", id));
}

// ---------- Заявки на обучение (training_requests) ----------
export async function submitTrainingRequest(payload) {
  return addDoc(collection(db, "training_requests"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function getTrainingRequests() {
  const q = query(collection(db, "training_requests"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function subscribeTrainingRequests(callback) {
  const q = query(collection(db, "training_requests"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

// ---------- Обратные звонки (callbacks) ----------
export async function submitCallback(payload) {
  return addDoc(collection(db, "callbacks"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

// ---------- Отзывы (reviews) ----------
export async function submitReview(payload) {
  return addDoc(collection(db, "reviews"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function getReviews() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ---------- Чат с ИИ (chat_sessions) ----------
export async function saveChatMessage(sessionId, message) {
  return addDoc(collection(db, "chat_sessions", sessionId, "messages"), {
    ...message,
    createdAt: serverTimestamp(),
  });
}