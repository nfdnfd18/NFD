import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import prisma from "../backend/lib/prisma.js"; // Import Prisma for database operations

dotenv.config(); // Load environment variables from .env

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CLIENT_URL || "http://localhost:7024",
        "https://5cbe-196-117-48-86.ngrok-free.app", // Add your ngrok URL here
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the origin
      }
    },
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

let onlineUsers = [];
// filepath: c:\Users\simoo\OneDrive\Bureau\FWD\socket\app.js
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};
// Add a user to the online users list with chatId
const addUser = (userId, socketId, chatId = null) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId, chatId });
  } else {
    // Update socketId and chatId if the user already exists
    userExists.socketId = socketId;
    userExists.chatId = chatId;
  }
};

// Remove a user from the online users list
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// Emit the list of online users to all connected clients
const emitOnlineUsers = () => {
  const onlineUserIds = onlineUsers.map((user) => user.userId);
  io.emit("onlineUsers", onlineUserIds); // Emit the list of online user IDs
};

// WebSocket connection logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Add a new user when they connect
  socket.on("newUser", ({ userId, chatId }) => {
    addUser(userId, socket.id, chatId);
    emitOnlineUsers(); // Notify all clients of the updated online users
    console.log("Online Users:", onlineUsers);
  });

  // Handle follow/unfollow notifications
  socket.on("sendNotification", ({ senderId, receiverId, type }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      const message =
        type === "FOLLOW"
          ? `User ${senderId} started following you.`
          : `User ${senderId} unfollowed you.`;

      // Emit the notification to the receiver
      io.to(receiver.socketId).emit("getNotification", { senderId, type, message });
    }
  });

  // Handle chat messages
  socket.on("sendMessage", async ({ chatId, senderId, text }) => {
    try {
      const message = await prisma.message.create({
        data: {
          chatId,
          senderId,
          text,
          createdAt: new Date(),
        },
      });

      // Emit the message only once to all users in the chat
      const chatUsers = onlineUsers.filter((user) => user.chatId === chatId);
      const emittedUsers = new Set(); // Track users to avoid duplicate emissions

      chatUsers.forEach((user) => {
        if (!emittedUsers.has(user.userId)) {
          io.to(user.socketId).emit("receiveMessage", message);
          emittedUsers.add(user.userId);
        }
      });
    } catch (err) {
      console.error("Error handling sendMessage:", err);
    }
  });

  // Remove the user when they disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    emitOnlineUsers(); // Notify all clients of the updated online users
    console.log("A user disconnected:", socket.id);
  });
});

// Export the `io` instance and the server
export { io, server, getUser };

// Start the WebSocket server
const SOCKET_PORT = process.env.SOCKET_PORT || 7026; // Ensure the port matches the frontend configuration
server.listen(SOCKET_PORT, () => console.log(`Socket    SSSSSSSSSSSSSSS EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR   VVVVVVVV           VVVVVVVVEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR                       AAA               RRRRRRRRRRRRRRRRR   EEEEEEEEEEEEEEEEEEEEEE     RRRRRRRRRRRRRRRRR   EEEEEEEEEEEEEEEEEEEEEE               AAA               DDDDDDDDDDDDD       YYYYYYY       YYYYYYY
 SS:::::::::::::::SE::::::::::::::::::::ER::::::::::::::::R  V::::::V           V::::::VE::::::::::::::::::::ER::::::::::::::::R                     A:::A              R::::::::::::::::R  E::::::::::::::::::::E     R::::::::::::::::R  E::::::::::::::::::::E              A:::A              D::::::::::::DDD    Y:::::Y       Y:::::Y
S:::::SSSSSS::::::SE::::::::::::::::::::ER::::::RRRRRR:::::R V::::::V           V::::::VE::::::::::::::::::::ER::::::RRRRRR:::::R                   A:::::A             R::::::RRRRRR:::::R E::::::::::::::::::::E     R::::::RRRRRR:::::R E::::::::::::::::::::E             A:::::A             D:::::::::::::::DD  Y:::::Y       Y:::::Y
S:::::S     SSSSSSSEE::::::EEEEEEEEE::::ERR:::::R     R:::::RV::::::V           V::::::VEE::::::EEEEEEEEE::::ERR:::::R     R:::::R                 A:::::::A            RR:::::R     R:::::REE::::::EEEEEEEEE::::E     RR:::::R     R:::::REE::::::EEEEEEEEE::::E            A:::::::A            DDD:::::DDDDD:::::D Y::::::Y     Y::::::Y
S:::::S              E:::::E       EEEEEE  R::::R     R:::::R V:::::V           V:::::V   E:::::E       EEEEEE  R::::R     R:::::R                A:::::::::A             R::::R     R:::::R  E:::::E       EEEEEE       R::::R     R:::::R  E:::::E       EEEEEE           A:::::::::A             D:::::D    D:::::DYYY:::::Y   Y:::::YYY
S:::::S              E:::::E               R::::R     R:::::R  V:::::V         V:::::V    E:::::E               R::::R     R:::::R               A:::::A:::::A            R::::R     R:::::R  E:::::E                    R::::R     R:::::R  E:::::E                       A:::::A:::::A            D:::::D     D:::::D  Y:::::Y Y:::::Y   
 S::::SSSS           E::::::EEEEEEEEEE     R::::RRRRRR:::::R    V:::::V       V:::::V     E::::::EEEEEEEEEE     R::::RRRRRR:::::R               A:::::A A:::::A           R::::RRRRRR:::::R   E::::::EEEEEEEEEE          R::::RRRRRR:::::R   E::::::EEEEEEEEEE            A:::::A A:::::A           D:::::D     D:::::D   Y:::::Y:::::Y    
  SS::::::SSSSS      E:::::::::::::::E     R:::::::::::::RR      V:::::V     V:::::V      E:::::::::::::::E     R:::::::::::::RR               A:::::A   A:::::A          R:::::::::::::RR    E:::::::::::::::E          R:::::::::::::RR    E:::::::::::::::E           A:::::A   A:::::A          D:::::D     D:::::D    Y:::::::::Y     
    SSS::::::::SS    E:::::::::::::::E     R::::RRRRRR:::::R      V:::::V   V:::::V       E:::::::::::::::E     R::::RRRRRR:::::R             A:::::A     A:::::A         R::::RRRRRR:::::R   E:::::::::::::::E          R::::RRRRRR:::::R   E:::::::::::::::E          A:::::A     A:::::A         D:::::D     D:::::D     Y:::::::Y      
       SSSSSS::::S   E::::::EEEEEEEEEE     R::::R     R:::::R      V:::::V V:::::V        E::::::EEEEEEEEEE     R::::R     R:::::R           A:::::AAAAAAAAA:::::A        R::::R     R:::::R  E::::::EEEEEEEEEE          R::::R     R:::::R  E::::::EEEEEEEEEE         A:::::AAAAAAAAA:::::A        D:::::D     D:::::D      Y:::::Y       
            S:::::S  E:::::E               R::::R     R:::::R       V:::::V:::::V         E:::::E               R::::R     R:::::R          A:::::::::::::::::::::A       R::::R     R:::::R  E:::::E                    R::::R     R:::::R  E:::::E                  A:::::::::::::::::::::A       D:::::D     D:::::D      Y:::::Y       
            S:::::S  E:::::E       EEEEEE  R::::R     R:::::R        V:::::::::V          E:::::E       EEEEEE  R::::R     R:::::R         A:::::AAAAAAAAAAAAA:::::A      R::::R     R:::::R  E:::::E       EEEEEE       R::::R     R:::::R  E:::::E       EEEEEE    A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D       Y:::::Y       
SSSSSSS     S:::::SEE::::::EEEEEEEE:::::ERR:::::R     R:::::R         V:::::::V         EE::::::EEEEEEEE:::::ERR:::::R     R:::::R        A:::::A             A:::::A   RR:::::R     R:::::REE::::::EEEEEEEE:::::E     RR:::::R     R:::::REE::::::EEEEEEEE:::::E   A:::::A             A:::::A   DDD:::::DDDDD:::::D        Y:::::Y       
S::::::SSSSSS:::::SE::::::::::::::::::::ER::::::R     R:::::R          V:::::V          E::::::::::::::::::::ER::::::R     R:::::R       A:::::A               A:::::A  R::::::R     R:::::RE::::::::::::::::::::E     R::::::R     R:::::RE::::::::::::::::::::E  A:::::A               A:::::A  D:::::::::::::::DD      YYYY:::::YYYY    
S:::::::::::::::SS E::::::::::::::::::::ER::::::R     R:::::R           V:::V           E::::::::::::::::::::ER::::::R     R:::::R      A:::::A                 A:::::A R::::::R     R:::::RE::::::::::::::::::::E     R::::::R     R:::::RE::::::::::::::::::::E A:::::A                 A:::::A D::::::::::::DDD        Y:::::::::::Y    
 SSSSSSSSSSSSSSS   EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR            VVV            EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR     AAAAAAA                   AAAAAAARRRRRRRR     RRRRRRREEEEEEEEEEEEEEEEEEEEEE     RRRRRRRR     RRRRRRREEEEEEEEEEEEEEEEEEEEEEAAAAAAA                   AAAAAAADDDDDDDDDDDDD           YYYYYYYYYYYYY    
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                           
   SSSSSSSSSSSSSSS EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR   VVVVVVVV           VVVVVVVVEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR        RRRRRRRRRRRRRRRRR   UUUUUUUU     UUUUUUUUNNNNNNNN        NNNNNNNN        SSSSSSSSSSSSSSS UUUUUUUU     UUUUUUUU       CCCCCCCCCCCCC       CCCCCCCCCCCCC                                              
 SS:::::::::::::::SE::::::::::::::::::::ER::::::::::::::::R  V::::::V           V::::::VE::::::::::::::::::::ER::::::::::::::::R       R::::::::::::::::R  U::::::U     U::::::UN:::::::N       N::::::N      SS:::::::::::::::SU::::::U     U::::::U    CCC::::::::::::C    CCC::::::::::::C                                              
S:::::SSSSSS::::::SE::::::::::::::::::::ER::::::RRRRRR:::::R V::::::V           V::::::VE::::::::::::::::::::ER::::::RRRRRR:::::R      R::::::RRRRRR:::::R U::::::U     U::::::UN::::::::N      N::::::N     S:::::SSSSSS::::::SU::::::U     U::::::U  CC:::::::::::::::C  CC:::::::::::::::C                                              
S:::::S     SSSSSSSEE::::::EEEEEEEEE::::ERR:::::R     R:::::RV::::::V           V::::::VEE::::::EEEEEEEEE::::ERR:::::R     R:::::R     RR:::::R     R:::::RUU:::::U     U:::::UUN:::::::::N     N::::::N     S:::::S     SSSSSSSUU:::::U     U:::::UU C:::::CCCCCCCC::::C C:::::CCCCCCCC::::C                                              
S:::::S              E:::::E       EEEEEE  R::::R     R:::::R V:::::V           V:::::V   E:::::E       EEEEEE  R::::R     R:::::R       R::::R     R:::::R U:::::U     U:::::U N::::::::::N    N::::::N     S:::::S             U:::::U     U:::::U C:::::C       CCCCCCC:::::C       CCCCCC                                              
S:::::S              E:::::E               R::::R     R:::::R  V:::::V         V:::::V    E:::::E               R::::R     R:::::R       R::::R     R:::::R U:::::D     D:::::U N:::::::::::N   N::::::N     S:::::S             U:::::D     D:::::UC:::::C             C:::::C                                                            
 S::::SSSS           E::::::EEEEEEEEEE     R::::RRRRRR:::::R    V:::::V       V:::::V     E::::::EEEEEEEEEE     R::::RRRRRR:::::R        R::::RRRRRR:::::R  U:::::D     D:::::U N:::::::N::::N  N::::::N      S::::SSSS          U:::::D     D:::::UC:::::C             C:::::C                                                            
  SS::::::SSSSS      E:::::::::::::::E     R:::::::::::::RR      V:::::V     V:::::V      E:::::::::::::::E     R:::::::::::::RR         R:::::::::::::RR   U:::::D     D:::::U N::::::N N::::N N::::::N       SS::::::SSSSS     U:::::D     D:::::UC:::::C             C:::::C                                                            
    SSS::::::::SS    E:::::::::::::::E     R::::RRRRRR:::::R      V:::::V   V:::::V       E:::::::::::::::E     R::::RRRRRR:::::R        R::::RRRRRR:::::R  U:::::D     D:::::U N::::::N  N::::N:::::::N         SSS::::::::SS   U:::::D     D:::::UC:::::C             C:::::C                                                            
       SSSSSS::::S   E::::::EEEEEEEEEE     R::::R     R:::::R      V:::::V V:::::V        E::::::EEEEEEEEEE     R::::R     R:::::R       R::::R     R:::::R U:::::D     D:::::U N::::::N   N:::::::::::N            SSSSSS::::S  U:::::D     D:::::UC:::::C             C:::::C                                                            
            S:::::S  E:::::E               R::::R     R:::::R       V:::::V:::::V         E:::::E               R::::R     R:::::R       R::::R     R:::::R U:::::D     D:::::U N::::::N    N::::::::::N                 S:::::S U:::::D     D:::::UC:::::C             C:::::C                                                            
            S:::::S  E:::::E       EEEEEE  R::::R     R:::::R        V:::::::::V          E:::::E       EEEEEE  R::::R     R:::::R       R::::R     R:::::R U::::::U   U::::::U N::::::N     N:::::::::N                 S:::::S U::::::U   U::::::U C:::::C       CCCCCCC:::::C       CCCCCC                                              
SSSSSSS     S:::::SEE::::::EEEEEEEE:::::ERR:::::R     R:::::R         V:::::::V         EE::::::EEEEEEEE:::::ERR:::::R     R:::::R     RR:::::R     R:::::R U:::::::UUU:::::::U N::::::N      N::::::::N     SSSSSSS     S:::::S U:::::::UUU:::::::U  C:::::CCCCCCCC::::C C:::::CCCCCCCC::::C                                              
S::::::SSSSSS:::::SE::::::::::::::::::::ER::::::R     R:::::R          V:::::V          E::::::::::::::::::::ER::::::R     R:::::R     R::::::R     R:::::R  UU:::::::::::::UU  N::::::N       N:::::::N     S::::::SSSSSS:::::S  UU:::::::::::::UU    CC:::::::::::::::C  CC:::::::::::::::C                                              
S:::::::::::::::SS E::::::::::::::::::::ER::::::R     R:::::R           V:::V           E::::::::::::::::::::ER::::::R     R:::::R     R::::::R     R:::::R    UU:::::::::UU    N::::::N        N::::::N     S:::::::::::::::SS     UU:::::::::UU        CCC::::::::::::C    CCC::::::::::::C                                              
 SSSSSSSSSSSSSSS   EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR            VVV            EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR     RRRRRRRR     RRRRRRR      UUUUUUUUU      NNNNNNNN         NNNNNNN      SSSSSSSSSSSSSSS         UUUUUUUUU             CCCCCCCCCCCCC       CCCCCCCCCCCCC  ${SOCKET_PORT}`));