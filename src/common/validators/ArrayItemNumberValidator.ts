import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "ArrayItemNumber", async: false })
export class ArrayItemNumberValidator implements ValidatorConstraintInterface {
	validate(arr: number[], args: ValidationArguments) {
		return Array.isArray(arr) && arr.filter(item => typeof item !== "number").length === 0;
	}

	defaultMessage(args: ValidationArguments) {
		return `Property ${args.property} must be array with items type number!`;
	}
}