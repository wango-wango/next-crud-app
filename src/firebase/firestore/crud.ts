import firebaseApp from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

// 添加数据
export async function addData(
  node: string,
  data: any
): Promise<{ result: any; error: any }> {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, node), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// 更新数据
export async function updateData(
  collection: string,
  id: string,
  data: any
): Promise<{ result: any; error: any }> {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, { merge: true });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// 删除数据
export async function deleteData(
  collection: string,
  id: string
): Promise<{ result: any; error: any }> {
  let result = null;
  let error = null;

  try {
    await deleteDoc(doc(db, collection, id));
    result = "Document deleted successfully";
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// 获取数据
export async function getData(
  collection: string,
  id: string
): Promise<{ result: any; error: any }> {
  let result = null;
  let error = null;

  try {
    const docRef: DocumentReference<DocumentData> = doc(db, collection, id);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    } else {
      error = "Document not found";
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
