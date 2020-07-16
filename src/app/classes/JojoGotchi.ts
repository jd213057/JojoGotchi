export class JojoGotchi {

  name: string;
  birthday: string;
  age: number;
  health: number;

  constructor(name) {
this.name = name;
this.initBirthday();
this.age = 0;
this.health = 100;
const today = new Date();
this.birthday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  initBirthday(): void {
  const today = new Date();
  this.birthday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  getBirthDay(): string {
    return this.birthday;
      }

      getName(): string {
        return this.name;
          }

  getAge(): number {
return this.age;
  }

  setAge(age: number): void {
    this.age = age;
  }

  getHealth(): number {
    return this.health;
      }

      setHealth(age: number): void {
        this.age = this.health;
      }

}
