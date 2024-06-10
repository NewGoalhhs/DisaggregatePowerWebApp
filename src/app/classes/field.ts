export class Field {
  private type: string;
  private name: string;
  private value: string;
  private options: string[];

  constructor(type: string, name: string, value: string, options: string[] = []) {
    this.type = type;
    this.name = name;
    this.value = value;
    this.options = options;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  getOptions() {
    return this.options;
  }

  setOptions(options: string[]) {
    this.options = options;
  }

  addOption(option: string) {
    this.options.push(option);
  }
}
