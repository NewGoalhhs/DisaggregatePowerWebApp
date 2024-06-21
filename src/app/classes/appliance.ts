export class Appliance {
  private id: number;
  private name: string;
  private isOn: boolean;
  private probability: number;

  constructor(id: number, name: string, isOn: boolean = false, probability: number = 0) {
    this.id = id;
    this.name = name;
    this.isOn = isOn;
    this.probability = probability;
  }

  getIsOn(): boolean {
    return this.isOn;
  }

  setIsOn(isOn: boolean): void {
    this.isOn = isOn;
  }

  getName(): string {
    return this.name;
  }

  getProbability(): number {
    return this.probability;
  }

  setName(name: string): void {
    this.name = name;
  }

  setProbability(probability: number): void {
    this.probability = probability;
  }

  getId(): number {
    return this.id;
  }
}
