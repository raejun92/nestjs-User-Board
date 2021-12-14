import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardService');
  constructor(private boardsRepository: BoardsRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  findAllBoard(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findOneBoard(id: number): Promise<Board> {
    const found = await this.boardsRepository.findOne(id);

    if (!found)
      throw new NotFoundException();

    return found;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const found = await this.boardsRepository.findOne(id);

    if (!found)
      throw new NotFoundException();
    found.status = status;
    await this.boardsRepository.save(found);

    return found;
  }

  async removeBoard(id: number): Promise<void> {
    const result = await this.boardsRepository.delete(id);
    
    this.logger.debug(`result: ${JSON.stringify(result)}`);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
