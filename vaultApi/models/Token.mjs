import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Unique user identifier
  accessToken: { type: String, required: true },
  token_type:{ type: String, required: true },
  refreshToken: { type: String, required: true },
  scope:{type: String, required: true},
  tokenExpiry: { type: Number, required: true },
},{
  timestamps: true
}
);

export default mongoose.model('Token', tokenSchema);