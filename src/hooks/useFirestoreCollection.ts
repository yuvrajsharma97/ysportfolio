import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useFirestoreCollection<T>(collectionName: string) {
  const [items, setItems] = useState<(T & { id: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collectionQuery = query(
      collection(db, collectionName),
      orderBy("order", "asc"),
    );

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        const nextItems = snapshot.docs.map(
          (docSnapshot) =>
            ({ id: docSnapshot.id, ...docSnapshot.data() }) as T & {
              id: string;
            },
        );
        setItems(nextItems);
        setIsLoading(false);
      },
      (err) => {
        setError("Unable to load content.");
        setIsLoading(false);
        if (import.meta.env.DEV) {
          console.error(`Firestore error (${collectionName}):`, err);
        }
      },
    );

    return unsubscribe;
  }, [collectionName]);

  return { items, isLoading, error };
}
