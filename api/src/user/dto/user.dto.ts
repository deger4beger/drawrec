import { IsNotEmpty, MaxLength } from 'class-validator';
import { PickType } from "@nestjs/mapped-types"

export class UserDTO {

	@IsNotEmpty()
	@MaxLength(20)
	username: string

	@IsNotEmpty()
	password: string

}

export class UpdateUsername extends PickType(UserDTO, ['username'] as const) {}

export class UserRO {
	id: string
	username: string
	created: Date
	token?: string
}