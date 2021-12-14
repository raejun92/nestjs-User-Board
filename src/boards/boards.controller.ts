import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Promise<Board> {
    this.logger.debug(`createBoardDto: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  findAllBoard(
    // Query 추가(유저 이름으로 해당 유저에 관한 게시글만 리턴)
  ): Promise<Board[]> {
    return this.boardsService.findAllBoard();
  }

  @Get(':id')
  findOneBoard(@Param('id') id: string) {
    return this.boardsService.findOneBoard(+id);
  }

  @Patch(':id')
  updateBoard(@Param('id') id: string) {
    return this.boardsService.updateBoard(+id);
  }

  @Delete(':id')
  removeBoard(@Param('id') id: string) {
    return this.boardsService.removeBoard(+id);
  }
}
