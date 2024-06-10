export class Appliance {
  private readonly id: number;
  private name: string;
  private isOn: boolean;

  constructor(id: number, name: string, isOn: boolean) {
    this.id = id;
    this.name = name;
    this.isOn = isOn;
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

  setName(name: string): void {
    this.name = name;
  }

  getId(): number {
    return this.id;
  }
}
