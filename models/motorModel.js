const mongoose = require("mongoose");

const CarModel = new mongoose.Schema(
  {
    comfort: {
      heated_seats: {
        type: Boolean,
        default: false,
      },
      seat_massage: {
        type: Boolean,
        default: false,
      },
      heated_steering: {
        type: Boolean,
        default: false,
      },
      entertainment: {
        type: String,
        maxlength: 50,
      },
    },

    safety: {
      anti_lockbrakes: {
        type: Boolean,
        default: false,
      },
      adaptive_headlights: {
        type: Boolean,
        default: false,
      },
      parking_sensors: {
        type: Boolean,
        default: false,
      },
    },
    make: {
      type: String,
      required: [true, "Please provide the car name!"],
      maxlength: 20,
    },
    model: {
      type: String,
      required: [true, "Please provide the car model!"],
      maxlength: 50,
    },
    yom: {
      type: String,
      required: true,
    },
    // type: {
    //   type: string,
    //   enum: ["Commercial", "Saloon", "Hatchback", "Wagon"],
    //   default: "others",
    // },
    engine_type: {
      type: String,
      required: true,
      maxlength: 20,
    },
    fuel_type: {
      type: String,
      required: [true, "Please provide the engine type"],
      enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
    },
    engine_capacity: {
      type: String,
      required: [true, "Please provide the engine capacity"],
      maxlength: 10,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
    },
    status: {
      type: String,
      enum: [
        "Brand new",
        "Locally used",
        "Foreign owned",
        "Project car",
        "Savage",
      ],
      default: "Foreign owned",
    },
    interior: {
      type: String,
    },
    exterior: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: [true, "Please provide the mileage"],
      maxlength: 15,
    },

    images: {
      type: [],
      default: "default image",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      maxlength: 9,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    subscription:{
      type:String,
      enum:['Active', 'Pending', 'Expired'],
      default:'Pending'
    },
    subscription_time:{
      type:Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Motor", CarModel);
