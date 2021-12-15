import { User } from 'src/auth/entities/auth.entity';
import { Repository, EntityRepository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
	async createBoard(createBoardDto: CreateBoardDto, user: User) {
		const { title, description } = createBoardDto;
		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user
		});

		await this.save(board);

		return board;
	}
}