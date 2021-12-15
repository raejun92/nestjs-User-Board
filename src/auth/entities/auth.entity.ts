import { Board } from 'src/boards/entities/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // username 중복 방지
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	// 첫번째 인자는 타입을 정의, 두번째는 user에서 board로 접근 방법 명시, eager: true는 user정보를 가져올 때 board정보도 가져옴
	@OneToMany(type => Board, board => board.user, { eager: true })
	boards: Board[];
}
