import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useSnapshot = () => {
  const [serviceMsg, setServiceMsg] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "TestRoom"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          if (data.author_id !== "Phil") {
            setServiceMsg(data.content);
          }
        }
      }),
        (error) => {
          console.log(error);
        };
    });

    return () => unsubscribe(); // 在組件卸載時取消訂閱
  });
  return serviceMsg;
};
export default useSnapshot;
