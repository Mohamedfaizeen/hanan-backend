import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  productName: String,   // save name at time of order (in case product changes)
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: Number,         // price at time of order
});

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: String,   // any special instructions from customer
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);