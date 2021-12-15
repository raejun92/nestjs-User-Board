import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UsePipes, ValidationPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/auth/get-user-decorator';
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
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe) // 입력 프로퍼티 예외처리
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User
  ): Promise<Board> {
    this.logger.debug(`createBoardDto: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
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

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateBoard(
    @Param('id', ParseIntPipe) id: string,
    // BoardStatusValidationPipe는 status의 값이 private 또는 public만 가능 하도록 예외처리
    @Body('title') title: string,
    @Body('descripton') description: string,
    @GetUser() user: User
  ): Promise<Board> {
    this.logger.debug(`id: ${id}, title: ${title}, description: ${description}, user: ${user}`);
    return this.boardsService.updateBoard(+id, title, description, user);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard())
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: string,
    // BoardStatusValidationPipe는 status의 값이 private 또는 public만 가능 하도록 예외처리
    @Body('status', BoardStatusValidationPipe) status: BoardStatus.PUBLIC,
    @GetUser() user: User
  ): Promise<Board> {
    this.logger.debug(`id: ${id}, status: ${status}`);
    return this.boardsService.updateBoardStatus(+id, status, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @UsePipes(ParseIntPipe)
  removeBoard(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    return this.boardsService.removeBoard(+id, user);
  }
}
