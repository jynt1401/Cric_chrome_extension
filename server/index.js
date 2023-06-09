const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//---------------mongoose connection----------------//

const Connection_url =
  "mongodb+srv://jayantbelwanshi1401:8458923788@cluster0.od8ltid.mongodb.net/Cric?retryWrites=true&w=majority";
const PORT = 3001;

mongoose
  .connect(Connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`runnging ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("strictQuery", true);
mongoose.set("strictQuery", true);

//---------------mongoose connection----------------//

app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header(
//     "Access-Control-Allow-Origin",
//     "Origin,X-Requested-With,Content-Type,Accept",
//     "Access-Control-Allow-Methods: GET, DELETE, HEAD, OPTIONS, POST"
//   );
//   // header("Access-Control-Allow-Methods:POST,GET,OPTION,PUT,DELETE")
//   // header("Access-Control-Allow-Headers:Content-Type,X-Auth-Token,Origin,Authorization")
//   next();
// });

app.use(express.json());
// app.use("/dashboard", dashboardRouter);
// app.use("/dashboard", require("./Routes/Userdetails"));
// app.use("/dashboard", require("./Routes/ProfileUpdate"));

// app.use("/register", require("./Routes/CreatUser"));
// app.use("/register", require("./Routes/Signup"));

// app.use("/transactions", require("./Routes/Transactions"));
// app.use("/transactions", require("./Routes/Transactions"));
// app.use("/wallet", require("./Routes/Wallet"));

app.use("/storedata", require("./Routes/StoreData.js"));
app.use("/getdata", require("./Routes/Getdata.js"));
