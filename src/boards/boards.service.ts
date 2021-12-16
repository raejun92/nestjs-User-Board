import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/auth.entity';
import { BoardStatus } from './board-status.enum';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardService');
  constructor(private boardsRepository: BoardsRepository) {}

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  findAllBoard(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findAllBoardMe(user: User): Promise<Board[]> {
    const query = this.boardsRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id});

    const boards = await query.getMany();

    return boards;
  }

  async findOneBoard(id: number): Promise<Board> {
    const found = await this.boardsRepository.findOne({ id });

    if (!found)
      throw new NotFoundException(`${id} is not found`);

    return found;
  }

  async updateBoard(id: number, title: string, description: string, user: User): Promise<Board> {
    const found = await this.boardsRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`${id} is not found`);
    }
    found.title = title;
    found.description = description;
    await this.boardsRepository.save(found);

    return found;
  }

  async updateBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board> {
    const found = await this.boardsRepository.findOne({ id, user });

    if (!found)
      throw new NotFoundException(`${id} is not found`);
    found.status = status;
    await this.boardsRepository.save(found);

    return found;
  }

  async removeBoard(id: number, user: User): Promise<void> {
    const result = await this.boardsRepository.delete({ id, user });

    this.logger.debug(`result: ${JSON.stringify(result)}`);
    if (result.affected === 0) {
      throw new NotFoundException(`${id} is not found`);
    }
  }
}
