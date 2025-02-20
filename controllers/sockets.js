const User = require("../models/user");

const userConectado = async (id) => {
  const user = await User.findById(id);
  user.online = true;
  await user.save();

  return user;
};

const userDesconectado = async (id) => {
  const user = await User.findById(id);
  user.online = false;
  await user.save();

  return user;
};
const getUser = async () => {
  const users = await User.find().sort("-online");

  return users;
};

// const grabarMensaje = async (payload) => {
//   try {
//     const mensaje = new Mensaje(payload);
//     await mensaje.save();

//     return mensaje;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

module.exports = {
  userConectado,
  userDesconectado,
  getUser,
};
