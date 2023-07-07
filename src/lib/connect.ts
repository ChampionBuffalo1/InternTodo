import mongoose from "mongoose";

let connected = false;

export default (async () => {
  if (connected) return;
  if (!process.env.DB_URL) throw new Error("No `DB_URL` env variable found.");

  mongoose.connection.on("disconnected", () => {
    connected = false;
    console.error("Mongoose connection lost");
  });
  mongoose.connection.on("error", (err) =>
    console.error(`Mongoose connection error: \n${err.stack}`)
  );
  mongoose.connection.on("connected", () => {
    connected = true;
    console.info("Mongoose has successfully connected!");
  });

  await mongoose.connect(process.env.DB_URL, {
    family: 4,
    maxPoolSize: 100,
    connectTimeoutMS: 10000,
  });
})();
