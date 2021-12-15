import { User } from 'src/auth/entities/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { BoardStatus } from '../board-status.enum';
@Entity()
export class Board {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	title: string;

	@Column()
	description: string;
	

	@Column()
	status: BoardStatus;

	// 첫번째 인자는 타입을 정의, 두번째는 board에서 user로 접근 방법 명시, eager: false는 board정보를 가져올 때 user정보는 가져오지 않음
	@ManyToOne(type => User, user => user.boards, { eager: false })
	user: User;
}
