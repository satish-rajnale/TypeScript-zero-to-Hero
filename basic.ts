type filterFunction<T> = (data: T[keyof T]) => boolean
type  FiltersType<T> = Record<keyof T, filterFunction<T>[]>
class EventProcessor<T extends {} >{
    private filters : FiltersType<T> = <FiltersType<T>>{}; // or you can also use {} as FiltersType<T>

    handleEvent<K extends keyof T>(eventName: K , data: T[K]): void {}

    addFilter<K extends keyof T>(eventName:K , filter: (data:T[K] ) => boolean): void {
        this.filters[<string>eventName] ||= []; //this means if you dont have any filters already go ahead and make an empty array
        //now the empty array is set or called the already defined filters
        this.filters[<string>eventName].push(filter);
    }

    addMap<K extends keyof T>(eventName:K , map: (data:T[K] ) => T[K]): void {}
}