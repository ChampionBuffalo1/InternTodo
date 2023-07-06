import mongoose from "mongoose";

export default async function connect() {
  if (!process.env.DB_URL) throw new Error("No `DB_URL` env variable found.");

  mongoose.connection.on("disconnected", () =>
    console.error("Mongoose connection lost")
  );
  mongoose.connection.on("error", (err) =>
    console.error(`Mongoose connection error: \n${err.stack}`)
  );
  mongoose.connection.on("connected", () =>
    console.info("Mongoose has successfully connected!")
  );

  await mongoose.connect(process.env.DB_URL, {
    family: 4,
    maxPoolSize: 100,
    connectTimeoutMS: 10000,
  });
}
