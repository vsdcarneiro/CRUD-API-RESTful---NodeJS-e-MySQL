import User from "./User.js";

const getUsers = async () => {
  try {
    const users = await User.findAll();

    if (users.every((user) => user instanceof User)) {
      return { users: users };
    }
    return { message: "No user found" };
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (user instanceof User) {
      return user;
    }
    return { message: "User not found" };
  } catch (error) {
    throw error;
  }
};

const createUser = async (firstName, lastName, email) => {
  try {
    const user = await User.create({ firstName, lastName, email });

    if (user instanceof User) {
      return user;
    }
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, attributes) => {
  try {
    const result = await User.update(attributes, { where: { id } });

    if (result[0] === 1) {
      return { message: "User updated" };
    }
    return { message: "User not found" };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const result = await User.destroy({ where: { id } });

    if (result === 1) {
      return { message: "User deleted" };
    }
    return { message: "User not found" };
  } catch (error) {
    throw error;
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
