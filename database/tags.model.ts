import { model, models, Schema } from "mongoose";

export interface ITags {
  name: string;
  questions: number;
}

const TagsSchema = new Schema<ITags>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Tags = models?.Tags || model<ITags>("Tags", TagsSchema);

export default Tags;
