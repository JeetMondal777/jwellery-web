const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  password: {
    type: String, 
    required: true, 
    select: false 
  }, // hashed
  address: String,
  number: String,
  wishlistItems: { 
    type: [{
      title:   { type: String, required: true, trim: true },
      imgLink: { type: String, required: true, trim: true },
      price:   { type: Number, required: true, min: 0 }
    }],
    default: [] 
  },
  cartItems: { 
    type: [{
      title:   { type: String, required: true, trim: true },
      imgLink: { type: String, required: true, trim: true },
      price:   { type: Number, required: true, min: 0 }
    }],
    default: [] 
  },
  orderedItems: { 
    type: [{
      title:   { type: String, required: true, trim: true },
      imgLink: { type: String, required: true, trim: true },
      price:   { type: Number, required: true, min: 0 },
      deliveryDetails: {
        name: { type: String },
        location: { type: String },
        landmark: { type: String },
        state: { type: String },
        number: { type: Number },
        pincode: { type: Number }
      }
    }],
    default: [] 
  },
 isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '24h'
      })
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
    
}

const userModel = mongoose.model("User", userSchema)
module.exports = userModel
