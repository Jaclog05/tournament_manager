const { User } = require("../models");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = await User.create({ email, password, name });

    const token = generateToken(user);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  
  } catch (error) {
    console.error("Error en el registro", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    res.status(201).json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  
  } catch (error) {
    console.error("Error en el login", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  register,
  login,
};
