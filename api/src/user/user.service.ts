import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async register(data: UserDTO): Promise<UserRO> {
		try {
			const { username } = data
			let user = await this.userRepository.findOne({ where: { username } })
			if (user) {
				throw new Error("User already exists")
			}
			user = await this.userRepository.create(data)
			user = await this.userRepository.save(user)
			return user.toResponseObject()
		} catch (err) {
			throw new BadRequestException(err)
		}
	}

	async login(data: UserDTO): Promise<UserRO> {
		try {
			const { username, password } = data
			const user = await this.userRepository.findOne({
				where: { username }
			})
			await user.comparePassword(password)
			return user.toResponseObject()
		} catch (err) {
			throw new BadRequestException("Auth failed")
		}
	}

	async updateUsername(userId: string, username: string): Promise<UserRO> {
		try {
			let user = await this.userRepository.findOne({ where: { id: userId } })
			if (!user) {
				throw new Error()
			}
			await this.userRepository.update({ id: userId }, { username })
			user = await this.userRepository.findOne({ where: { id: userId } })
			return user.toResponseObject(false)
		} catch (err) {
			throw new BadRequestException("Auth failed")
		}
	}

}
