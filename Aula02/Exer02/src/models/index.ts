import mongoose, { Schema, Document } from "mongoose";

interface IDistrict {
  name: string;
}

interface ICity {
  name: string;
  districts: IDistrict[];
}

interface IState extends Document {
  name: string;
  cities: ICity[];
}

const DistrictSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  districts: [DistrictSchema],
});

const StateSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  cities: [CitySchema],
});

export const State = mongoose.model<IState>("State", StateSchema);
