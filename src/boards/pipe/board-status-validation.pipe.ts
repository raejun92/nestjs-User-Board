import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
	readonly StatusOptions = [
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	]

	transform(value: any) {
		value = value.toUpperCase();

		if (!(this.isSatatusValid(value))) {
			throw new BadRequestException();
		}

		return value;
	}

	private isSatatusValid(status: any) {
		const index = this.StatusOptions.indexOf(status);

		return index !== -1;
	}
}