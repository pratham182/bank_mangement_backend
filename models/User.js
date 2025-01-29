const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');



const UserSchema=mongoose.Schema({
    username: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  role:{type:String,default:"user"}
});


UserSchema.pre('save', async function(next) {
    
  
    if (!this.isModified('password')) {
      return next();  
    }
  
    try {
    
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
  
      
      this.password = hashedPassword;
  
      next();  
    } catch (err) {
      console.error('Error hashing password:', err);
      next(err);  
    }
  });
  

module.exports =mongoose.model("userModel",UserSchema);
