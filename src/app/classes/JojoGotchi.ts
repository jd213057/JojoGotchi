export class JojoGotchi {

  name: string;
  birthday;
  age: number;
  health: number;

  constructor(name) {
this.name = name;
this.age = 0;
this.health = 100;
const today = new Date();
const birthdayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
this.birthday = { birthdayString, birthdayMilliSec: today.getTime() };
  }

  getBirthDay() {
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
