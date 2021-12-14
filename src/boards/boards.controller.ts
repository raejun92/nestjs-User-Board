import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
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
    this.logger.log(`createBoardDto: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  findAllBoard() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.boardsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
