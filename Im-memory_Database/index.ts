interface Pokeomn {
  id: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newVal: T): void;
  get(id: string): T | undefined;
}

class InMemoryDatabse<T extends BaseRecord> implements Database<T> {
  private db: Record<string, T> = {};

  public set(newVal: T): void {
    this.db[newVal.id] = newVal;
  }
  public get(id: string): T {
    return this.db[id];
  }
}
