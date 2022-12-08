const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8080

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening on port 8080.");
  }
});

mongoose
  .connect("mongodb+srv://Manish026636:manish1728@cluster0.fotxcbf.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin:"http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const bookingRouter = require("./Routes/bookingRoutes");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/api", bookingRouter);

app.use("/", authRoutes);
