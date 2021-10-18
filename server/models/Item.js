const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    part_number: {
      type: Int,
      required: true,
      unique: true, 
      trim: true
    },
    quantity: {
      type: Int,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;