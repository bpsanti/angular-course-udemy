export class Ingredient {
  public name: string;
  public amount: number;
  public measuringUnit: string;

  constructor(name: string, amount: number, measuringUnit: string) {
    this.name = name;
    this.amount = amount;
    this.measuringUnit = measuringUnit;
  }
}
