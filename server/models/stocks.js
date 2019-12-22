import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: {
    type: Number
  },
  content: {
    type: Array
  }
});

const stock = new mongoose.model("Stock", schema);

export default stock;
