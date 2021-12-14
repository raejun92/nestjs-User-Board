import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  createBoard(createBoardDto: CreateBoardDto) {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  findAllBoard() {
    return this.boardsRepository.find();
  }

  findOneBoard(id: number) {
    return `This action returns a #${id} board`;
  }

  updateBoard(id: number) {
    return `This action updates a #${id} board`;
  }

  removeBoard(id: number) {
    return `This action removes a #${id} board`;
  }
}
