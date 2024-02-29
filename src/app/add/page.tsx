"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  Firestore,
  getFirestore,
  DocumentData,
} from "firebase/firestore";

import { addData, deleteData, updateData } from "../../firebase/firestore/crud";
import firebaseApp from "@/firebase/config";
interface Items {
  id: string;
  name: string;
  price: string;
}

export default function Home() {
  const [items, setItems] = useState<Items[]>([]);
  const [newItem, setNewItem] = useState<Items>({
    id: "",
    name: "",
    price: "",
  });
  const [total, setTotal] = useState(0);

  // 初始化 Firestore
  const db: Firestore = getFirestore(firebaseApp);

  // 監聽資料是否有改變
  function listenToCollection(
    collectionName: string,
    callback: (items: any[], total: number) => void
  ): () => void {
    const q = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        let itemsArr: any[] = [];

        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });
        callback(itemsArr, calculateTotal(itemsArr));
      }
    );

    return unsubscribe;
  }
  // 計算總價
  function calculateTotal(items: any[]): number {
    return items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  }

  // Read items from database
  useEffect(() => {
    // 呼叫 listenToCollection 函數來監聽集合變化
    const unsubscribe = listenToCollection(
      "items",
      (itemsArr: any[], total: number) => {
        // 在回調函數中更新組件狀態
        setItems(itemsArr);
        setTotal(total);
      }
    );

    // 在元件卸載時取消訂閱
    return () => unsubscribe();
  }, []);

  // Add item to database
  const addItem: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const id = new Date().getTime().toString();
    if (newItem.name !== "" && newItem.price !== "") {
      // 呼叫 addData 函數新增數據
      const { result, error } = await addData("items", {
        id: "item" + (items.length + 1),
        name: newItem.name.trim(),
        price: newItem.price,
      });
      // 檢查是否發生錯誤
      if (error) {
        console.error("Error adding item:", error);
      } else {
        console.log(result);
        // 清空 newItem 狀態
        setNewItem({ id: "", name: "", price: "" });
      }
    }
  };

  // Delete items from database
  const deleteItem = async (id: string) => {
    // 呼叫 deleteData 函數刪除數據
    const { result, error } = await deleteData("items", id);

    // 檢查是否發生錯誤
    if (error) {
      console.error("Error deleting item:", error);
    } else {
      console.log(result); // 輸出成功訊息
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
