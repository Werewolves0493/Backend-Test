import { model, Schema, Document } from 'mongoose';

interface UserDoc extends Document {
  name: string;
  email: string;
  age: number;
}

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
});

export const User = model<UserDoc>('User', userSchema);
