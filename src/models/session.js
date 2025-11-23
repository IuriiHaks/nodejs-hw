import { Schema, model } from 'mongoose';

export const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('Session', sessionSchema);
