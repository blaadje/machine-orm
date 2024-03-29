import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import Post from "@/core/models/Post";

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(Post);

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
});

export default store;
