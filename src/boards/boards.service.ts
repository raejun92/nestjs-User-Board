import { Injectable, NotFoundException } from '@nestjs/common';
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

  updateBoard(id: number) {
    return `This action updates a #${id} board`;
  }

  removeBoard(id: number) {
    return `This action removes a #${id} board`;
  }
}
