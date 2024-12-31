import UserRepository from '../repositories/UserRepository.js';
import { createHash, isValidPassword } from '../utils/functionsUtils.js';
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/UserDTO.js';

class UserService {
    async registerUser(data) {
        const hashedPassword = createHash(data.password);
        const newUser = {
            first_name: data.first_name ?? "",
            last_name: data.last_name ?? "",
            email: data.email,
            age: data.age ?? "",
            password: hashedPassword,
        };
        return await UserRepository.createUser(newUser);
    }

    async loginUser(email, password) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user || !isValidPassword(user, password)) {
            throw new Error("Invalid email or password");
        }
        return user;
    }

    generateToken(user) {
        return jwt.sign({ sub: user._id }, process.env.CLIENT_SECRET, { expiresIn: '1h' });
    }

    async getCurrentUser(userId) {
        const user = await UserRepository.findUserById(userId);
        return new UserDTO(user);
    }
}

export default new UserService();