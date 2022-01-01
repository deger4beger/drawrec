import {
	BeforeInsert,
 	Column,
 	CreateDateColumn,
 	Entity,
 	PrimaryGeneratedColumn,
 	OneToOne
} from 'typeorm'
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { UserRO } from '../dto/user.dto';
import { JWT_SECRET } from '../../../config/config';

@Entity("user")
export class UserEntity {

	@PrimaryGeneratedColumn("uuid")
	public id: string

	@CreateDateColumn()
	public created: Date

	@Column({
		type: "text",
		unique: true,
	})
	public username: string

	@Column("text")
	private password: string

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10)
	}

	toResponseObject(showToken: boolean = true): UserRO {
		const { id, created, username, token } = this
		const responseObject: any = { id, created: created.toString(), username }
		if (showToken) {
			responseObject.token = token
		}
		return responseObject
	}

	async comparePassword(attempt: string) {
		const compared = await bcrypt.compare(attempt, this.password)
		if (!compared) {
			return Promise.reject()
		}
		return compared
	}

	private get token() {
		const { id, username } = this
		return jwt.sign(
			{
				id,
				username
			},
			JWT_SECRET,
			{
				expiresIn: "1d"
			}
		)
	}
}