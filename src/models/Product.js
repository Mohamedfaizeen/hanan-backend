import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      enum: ['stamps', 'printing', 'stationery', 'other'],
      default: 'other',
    },
    image: {
      type: String,   // store image URL (from Cloudinary or similar)
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,  // for homepage featured products section
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);