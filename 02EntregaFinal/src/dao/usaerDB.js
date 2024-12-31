import UserModel from './models/UserModel.js';

class UserDAO {
    async createUser(user) {
        return await UserModel.create(user);
    }

    async findUserByEmail(email) {
        return await UserModel.findOne({ email }).lean();
    }

    async findUserById(id) {
        return await UserModel.findById(id).lean();
    }
}

export default new UserDAO();