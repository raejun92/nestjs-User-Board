import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe) // 입력 프로퍼티 예외처리
  createBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Promise<Board> {
    this.logger.debug(`createBoardDto: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  findAllBoard(
    // TODO: Query 추가(유저 이름으로 해당 유저에 관한 게시글만 리턴)
  ): Promise<Board[]> {
    return this.boardsService.findAllBoard();
  }

  @Get(':id')
  @UsePipes(ParseIntPipe) // :id에 숫자가 아닌 값 예외처리
  findOneBoard(
    @Param('id') id: string
  ): Promise<Board> {
    return this.boardsService.findOneBoard(+id);
  }

  @Patch(':id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: string,
    // BoardStatusValidationPipe는 status의 값이 private 또는 public만 가능 하도록 예외처리
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    this.logger.debug(`id: ${id}, status: ${status}`);
    return this.boardsService.updateBoardStatus(+id, status);
  }

  @Delete(':id')
  @UsePipes(ParseIntPipe)
  removeBoard(
    @Param('id') id: string
  ): Promise<void> {
    return this.boardsService.removeBoard(+id);
  }
}
