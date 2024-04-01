// import { useState, useEffect } from "react";
// import { socket } from "../socket";

// function useSocket() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [serviceMsg, setServiceMsg] = useState("");
//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     function onServiceMsg(value) {
//       setServiceMsg(value);
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);
//     socket.on("/app/chat.sendMessage", onServiceMsg);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//       socket.off("/app/chat.sendMessage", onServiceMsg);
//     };
//   }, []);
//   return { serviceMsg, isConnected };
// }
// export default useSocket;
