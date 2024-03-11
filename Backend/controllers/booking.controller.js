const Booking = require("../models/booking.model.js");
const moment = require("moment");
const User = require("../models/user.model.js");
const Room = require("../models/room.model.js");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_zL7ejbw9qqNnag",
  key_secret: "xFscIueWyacHbdrWiKZgtYT4",
});

class BookingController {
  async createBooking(req, res) {
    const { amount, currency } = req.body;

    try {
      const order = await razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency: currency,
        receipt: "order_receipt",
        payment_capture: 1,
      });
      console.log(order, " _order_");

      res.json({
        paymentId: order.id,
        keyId: "rzp_test_zL7ejbw9qqNnag",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to initiate payment" });
    }
  }

  async verifyPayment(req, res) {
    const {
      startDate,
      endDate,
      amount,
      paymentId,
      hotelId,
      userId,
      roomData,
      rooms,
    } = req.body;
    const captureResponse = await razorpay.payments.capture(
      paymentId,
      amount * 100,
      "INR"
    );

    const start = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const end = moment.utc(endDate, "DD-MM-YYYY").toDate();
    const datesArray = [];
    let current = moment(start);
    while (current.isSameOrBefore(end)) {
      datesArray.push(current.toDate());
      current.add(1, "day");
    }

    if (captureResponse.status === "captured") {
      const payment = new Booking({
        amount,
        paymentId,
        hotelId,
        userId,
        rooms,
        status: "paid",
        startDate: start,
        endDate: end,
      });
      await payment.save();

      for (let i = 0; i < roomData.length; i++) {
        for (let j = 0; j < roomData[i].roomNo.length; j++) {
          await Room.updateOne(
            {
              _id: roomData[i]._id,
              "unAvailability.roomNo": roomData[i].roomNo[j],
            },
            {
              $push: {
                "unAvailability.$.date": { $each: datesArray },
              },
            }
          );
        }
      }
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  }
}

module.exports = BookingController;
