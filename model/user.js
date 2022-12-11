const mongoose =  require('mongoose')


const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.statics.isThisEmailInUse = async function(email){
    if(!email) throw new Error('Invalid Email')
    try {
        const user = await this.findOne({email})
        if(user) return false
        
        return true
    } catch (err) {
        console.log(err.message);
        return false
    }
  
}
userSchema.methods.isThisEmailInUse

module.exports = mongoose.model('User', userSchema)