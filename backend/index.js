import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/HostelBooking",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  rollno: Number,
  gender: String,
  email: String,
  password: String,
  booked: Boolean,
});

const hostelSchema = new mongoose.Schema({
  rollno: Number,
  hostelNumber: String,
  roomNumber: String,
  mess: Boolean,
});

const roomSchema = new mongoose.Schema({
  hostelNumber: String,
  roomNumber: Number,
  availability: Boolean,
  gender: String,
});

const User = new mongoose.model("User", userSchema);
const Hostel = new mongoose.model("Hostel", hostelSchema);
const Rooms = new mongoose.model("Rooms", roomSchema);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not Registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, rollno, gender, email, password, booked } = req.body;
  User.findOne({ rollno: rollno }, (err, user) => {
    if (user) {
      res.send({ message: "User already regstered" });
    } else {
      const user = new User({
        name,
        rollno,
        gender,
        email,
        password,
        booked,
      });

      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "User Successfully Registered" });
        }
      });
    }
  });
});

app.post("/submit", (req, res) => {
  const { rollno, hostelNumber, roomNumber, mess } = req.body;

  Rooms.findOne(
    { hostelNumber: hostelNumber, roomNumber: roomNumber, availability: true },
    (err, detail) => {
      if (detail) {
        const room = new Hostel({
          rollno,
          hostelNumber,
          roomNumber,
          mess,
        });

        room.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Room Booked Successfully" });
          }
        });
      } else {
        res.send({ message: "Room already Booked OR Room does not exist" });
      }
    }
  );
});

app.put("/user", (req, res) => {
  const { rollno } = req.body;

  User.updateOne({ rollno: rollno }, { $set: { booked: true } }, (err) => {
    if (err) {
      res.send({ message: "User update error" });
    } else {
      res.send({ message: "User update success" });
    }
  });
});

app.put("/roomUpdate", (req, res) => {
  const { hostelNumber, roomNumber } = req.body;
  Rooms.updateOne(
    { hostelNumber: hostelNumber, roomNumber: roomNumber },
    { $set: { availability: false } },
    (err) => {
      if (err) {
        res.send({ message: "Room update error" });
      } else {
        res.send({ message: "Room update success" });
      }
    }
  );
});

app.get("/roomDetails", (req, res) => {
  Rooms.find({}, (err, room) => {
    if (room) {
      res.send({ message: "Details of room", room });
    } else {
      res.send({ message: "Details retrieval error" });
    }
  });
});

app.listen(9002, () => {
  console.log("Server listening on port 9002");
});
