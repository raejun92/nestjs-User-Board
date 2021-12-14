import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
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

  removeBoard(id: number) {
    return `This action removes a #${id} board`;
  }
}
