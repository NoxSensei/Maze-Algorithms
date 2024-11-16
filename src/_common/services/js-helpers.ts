export class JsHelpers {
    public static randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    public static shuffleArray<T>(array: T[]): T[] {
        return Array.from<T>(array)
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
    }

    public static async sleep(ms: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    public static wrapWithDebounce<T extends (...args: any[]) => any>(method: T, timeoutInMs: number): (...args: Parameters<T>[number][]) => ReturnType<T> {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            const callback = () => {
                method(...args)
            };
            timerId = setTimeout(callback, timeoutInMs);
        }
    }
}
