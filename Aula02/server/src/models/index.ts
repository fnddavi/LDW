import mongoose from "mongoose";


const { Schema } = mongoose;
// define os schemas

// Schema para o usuário
const UserSchema = new Schema({
  mail: {
    type: String,
    maxlength: [50, "O e-mail pode ter no máximo 30 caracteres"],
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        // expressão regular para validar o formato do e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido`,
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, "A senha precisa ter no mínimo 6 caracteres"],
    maxlength: [10, "A senha precisa ter no máximo 10 caracteres"],
    select: false,
    required: [true, "A senha é obrigatória"],
  },
});

// Schema para os gastos
const SpentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (id: string) {
        const user = await User.findById(id); // verifica se id existe na coleção users
        return !!user; // true se o usuário existir
      },
      message: "O usuário fornecido não existe",
    },
  },
  description: {
    type: String,
    maxlength: 30,
    required: [true, "A descrição é obrigatória"],
  },
  value: {
    type: Number,
    required: [true, "O valor é obrigatório"],
  },
});

// Schema para as pessoas
const peopleSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    maxlength: 30 ,
    unique: true
  },
  phones: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Phone" 
  }], // Array de referências para os telefones
  cars: [{ 
    type: Schema.Types.ObjectId, 
    ref: "CarByPerson" 
  }], // Referências para a tabela intermediária de carros
});

// Schema para os telefones
const phoneSchema = new Schema({
  number: { 
    type: String, 
    required: true,
    match: /^[0-9]{11}$/, 
    maxlength: 11 
  },
  idpeople: { 
    type: Schema.Types.ObjectId, 
    ref: 'People', 
    required: true 
  } // Referência para o dono do telefone
});

// Schema para os carros
const carSchema = new Schema({
  model: { 
    type: String, 
    required: true, 
    maxlength: 15,
    unique: true
  }
});

// Schema para a tabela intermediária entre pessoas e carros
const carByPersonSchema = new Schema({
  idcar: { 
    type: Schema.Types.ObjectId, 
    ref: 'Car', 
    required: true 
  }, // Referência para o carro
  idpeople: { 
    type: Schema.Types.ObjectId, 
    ref: 'People', 
    required: true 
  } // Referência para a pessoa
});


const User = mongoose.model("User", UserSchema);
const Spent = mongoose.model("Spent", SpentSchema);
const People = mongoose.model("People", peopleSchema);
const Car = mongoose.model('Car', carSchema);
const Phone = mongoose.model('Phone', phoneSchema);
const CarByPerson = mongoose.model('CarByPerson', carByPersonSchema);


export { User, Spent, People, Car, Phone, CarByPerson };
