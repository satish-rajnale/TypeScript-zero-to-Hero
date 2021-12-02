// abstract method mean it cannot have a implementation
// and every abstract method should be defined inside a abstract class
abstract class Heroes {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.Name} attacks with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get Name(): string;
}

// cannot create an instance like this directly from the abstract class
// const saitama = new Heroes();

class DeadlySkill extends Heroes {
  getSpecialAttack(): string {
    return 'Serious punch';
  }

  get Name(): string {
    return 'saitama';
  }
}

const saitama = new DeadlySkill();
console.log(saitama.getSpecialAttack());
saitama.fight();

abstract class HeroList {
  assignClass() {
    var classLevel = 'S';
    if (this.power < 50) {
      classLevel = 'C';
    } else if (50 <= this.power && this.power < 75) {
      classLevel = 'B';
    } else if (75 <= this.power && this.power < 100) {
      classLevel = 'A';
    } else {
      classLevel = 'S';
    }

    console.log({
      name: this.name,
      power: this.power,
      skill: this.getHeroSkill(),
      class: classLevel,
    });
  }

  abstract get name(): string;
  abstract get power(): number;
  abstract getHeroSkill(): string;
}

class HeroClass extends HeroList {
  public skillName = 'No skills';
  public powerVal = 0;
  public heroName = 'Unknown';
  getHeroSkill(): string {
    return this.skillName;
  }
  get name(): string {
    return this.heroName;
  }
  get power(): number {
    return this.powerVal;
  }
}

const cyborg = new HeroClass();
cyborg.skillName = 'Incinerate';
cyborg.powerVal = 20;
cyborg.heroName = 'Genos';
cyborg.assignClass();
