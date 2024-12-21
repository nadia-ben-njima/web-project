const Order = require("../models/Order");

const postOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).send({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send({ message: 'Error placing order.', error });
  }
};


module.exports = {
  postOrder,
};
