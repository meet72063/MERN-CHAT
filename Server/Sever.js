const express = require("express");
const app = express();
const server = require("http").createServer(app);
require("dotenv").config();
const cors = require("cors");
const connect = require("./connect");
const userRoutes = require("./routes/userRoute");
const { User } = require("./models/UserModel");
const { Message } = require("./models/MessagesModal");

//connect to db
connect();

//rooms user can join
const rooms = [
  "General",
  "F.R.I.E.N.D.S.",
  "The Office Avengers",
  "Happy Hour",
];

//middlewares
app.use(express.json());
app.use(cors());

//setting base url for particular router
app.use("/", userRoutes);

//send roooms
app.get("/rooms", (req, res) => {
  res.json({ rooms });
});

//socket instance
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const getLastMessagesFromRoom = async (room) => {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    {
      $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } },
    },
  ]);
  return roomMessages;
};

// function sortRoomMessageByDate(messages) {
//   return messages.sort(function (a, b) {
//     let date1 = a._id.split("/");
//     let date2 = b._id.split("/");

//     date1 = date1[0] + date1[1] + date1[2]; // Rearrange the date parts
//     date2 = date2[0] + date2[1] + date2[2]; // Rearrange the date parts

//     return date1 > date2 ? 1 : -1;
//   });
// }

//socket  connection
io.on("connection", async (socket) => {
  const members = await User.find();

  //send all members to client
  socket.emit("connected", members);

  socket.on("new-user", async () => {
    const members = await User.find().sort({ createdAt: -1 });
    io.emit("new-user", members);
  });

  //joining room
  socket.on("joinRoom", async (room) => {
    socket.join(room);
    // const newmessage = await getLastMessagesFromRoom(room);
    // const sortedMessages = await sortRoomMessageByDate(newmessage);

    let roomMessages = await Message.find({ to: room })
      .sort({ date: 1, time: 1 })
      .populate({ path: "by", select: "-password" }) //exclude password
      .exec();
    socket.emit("room-messages", roomMessages);
  });

  socket.on("messageToRoom", async (content, to, by, date, time) => {
    //save new message to DB
    await Message.create({ content, to, by, date, time });

    //find privded room message,sort in ascending order by date & time ,populate 'by' field for sender info
    const messages = await Message.find({ to })
      .sort({ date: 1, time: 1 })
      .populate({ path: "by", select: "-password" }) //exclude password
      .exec();

    io.to(to).emit("newMessageFromRoom", messages);
  });
});

const port = process.env.PRODUCTION_PORT || 5000;

server.listen(port, () => {
  console.log("server has been listening on the port 5000");
});
