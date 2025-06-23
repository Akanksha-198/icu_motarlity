// import mongoose from "mongoose";

// const connect = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017", { dbName: "PatientData" }).then(() => console.log("Connected to MongoDB"));
//   } catch (error) {
//     throw new Error("Connection failed!");
//   }
// };

// export default connect;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection failed!", error);
    throw new Error("Connection failed!");
  }
};

export default connect;