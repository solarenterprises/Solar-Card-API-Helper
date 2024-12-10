import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
    userId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    firstName:{ type: String },
    lastName:{ type: String },
    password: { type: String, required: true },
    // phoneNumber: { type: String },
    // isPhoneVerified: { type: Boolean, default: false },
    // kycStatus: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'], default: 'PENDING' },
    // sumsubApplicantId: { type: String },

},{
    timestamps: true
}
);

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model('User', UserSchema);
