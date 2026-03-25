import Order from '../models/Order.js';

// POST /api/orders — customer places an order
export const createOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({
      message: 'Order placed successfully! We will contact you soon.',
      order: saved,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders — get all orders (admin)
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id — get single order
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// PUT /api/orders/:id/status — update order status (admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};