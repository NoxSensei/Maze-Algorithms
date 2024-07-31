export class JsHelpers {
    public static randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    public static shuffleArray<T>(array: T): T[] {
        return Array.from<T>(array)
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
    }
}