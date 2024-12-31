import UserDAO from '../dao/usaerDB.js';

class UserRepository {
    async createUser(user) {
        return await UserDAO.createUser(user);
    }

    async findUserByEmail(email) {
        return await UserDAO.findUserByEmail(email);
    }

    async findUserById(id) {
        return await UserDAO.findUserById(id);
    }
}

export default new UserRepository();