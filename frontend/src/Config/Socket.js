import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASESERVER_URI,{
    autoConnect: false,
}); // Replace with your server URL

export default socket;
