const { User } = require('../models');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'name', 'createdAt']
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error obteniendo el perfil del usuario', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { getProfile };