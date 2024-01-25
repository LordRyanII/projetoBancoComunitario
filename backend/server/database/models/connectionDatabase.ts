import mongoose from "mongoose";

class Database {
  async _connect(url: string | undefined): Promise<void> {
    try {
    if (typeof url === "string") {
      const connectionSucess = async () => await mongoose.connect(url);
      await connectionSucess();
      console.log(`-----------------------------------------------`);
      return console.log("Database connection sucess");
      
    }
  } catch (error) {
      console.log(`-----------------------------------------------`);
      console.log(`Erro ao conectar no banco de dados ${error}`);
      console.log(`-----------------------------------------------`);
    }
    throw new Error("Incorrect database URL!");
  }
}

export default Database;
