import io from "socket.io-client";
import { API_BASE_URL } from "../../env";
const socket = io(API_BASE_URL);
socket.connect();
export default socket;
