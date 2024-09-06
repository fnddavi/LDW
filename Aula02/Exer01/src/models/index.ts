import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema para as pessoas
const peopleSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    unique: true,
  },
  phones: [
    {
      type: Schema.Types.ObjectId,
      ref: "Phone",
    },
  ], // Array de referências para os telefones
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "CarByPerson",
    },
  ], // Referências para a tabela intermediária de carros
});

// Schema para os telefones
const phoneSchema = new Schema({
  number: {
    type: String,
    required: true,
    match: /^[0-9]{11}$/,
    maxlength: 11,
  },
  idpeople: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: true,
  }, // Referência para o dono do telefone
});

// Schema para os carros
const carSchema = new Schema({
  model: {
    type: String,
    required: true,
    maxlength: 15,
    unique: true,
  },
});

// Schema para a tabela intermediária entre pessoas e carros
const carByPersonSchema = new Schema({
  idcar: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  }, // Referência para o carro
  idpeople: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: true,
  }, // Referência para a pessoa
});

const People = mongoose.model("People", peopleSchema);
const Car = mongoose.model("Car", carSchema);
const Phone = mongoose.model("Phone", phoneSchema);
const CarByPerson = mongoose.model("CarByPerson", carByPersonSchema);

export { People, Car, Phone, CarByPerson };
