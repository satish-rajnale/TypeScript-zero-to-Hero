type filterFunction<T> = (data: T[keyof T]) => boolean;
type MapFunction<T> = (data: T[keyof T]) => T[keyof T];
type FiltersType<T> = Record<keyof T, filterFunction<T>[]>;
type MapsType<T> = Record<keyof T, MapFunction<T>[]>;
type ProcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};

class EventProcessor<T extends {}> {
  private filters: FiltersType<T> = <FiltersType<T>>{}; // or you can also use {} as FiltersType<T>
  private maps: MapsType<T> = <MapsType<T>>{}; // or you can also use {} as FiltersType<T>
  private processed: ProcessedEvent<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;
    for (const filter of this.filters[eventName] ?? []) {
      if (!filter(data)) {
        allowEvent = false;
        break;
      }
    }

    if (allowEvent) {
      let mappedData = { ...data };
      for (const map of this.maps[eventName] ?? []) {
        mappedData = <T[K]>map(mappedData);
      }

      this.processed.push({
        eventName,
        data: mappedData,
      });
    }
  }

  addFilter<K extends keyof T>(
    eventName: K,
    filter: (data: T[K]) => boolean
  ): void {
    this.filters[<string>eventName] ||= []; //this means if you dont have any filters already go ahead and make an empty array
    //now the empty array is set or called the already defined filters
    this.filters[<string>eventName].push(filter);
  }

  addMap<K extends keyof T>(eventName: K, map: (data: T[K]) => T[K]): void {
    this.maps[<string>eventName] ||= [];

    this.maps[<string>eventName].push(map);
  }

  getProcessedEvents() {
    return this.processed;
  }
}
