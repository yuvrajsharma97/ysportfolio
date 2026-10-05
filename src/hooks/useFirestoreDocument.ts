import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useFirestoreDocument<T>(
  collectionName: string,
  docId: string,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const docRef = doc(db, collectionName, docId);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setData(snapshot.exists() ? (snapshot.data() as T) : null);
        setIsLoading(false);
      },
      (err) => {
        setError("Unable to load content.");
        setIsLoading(false);
        if (import.meta.env.DEV) {
          console.error(`Firestore error (${collectionName}/${docId}):`, err);
        }
      },
    );

    return unsubscribe;
  }, [collectionName, docId]);

  return { data, isLoading, error };
}
