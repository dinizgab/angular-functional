export function distinct<T>(colecao: T[], atributo: keyof T): T[] {
    const seen = new Set();
    return colecao.filter(item => {
        const value = item[atributo];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

export function groupBy<T>(collection: T[], attribute: string): Record<string, T[]> {
    return collection.reduce((acc: Record<string, T[]>, item: T) => {
        const keys = attribute.split('.');
        const key = keys.reduce((o: any, k: string) => o[k], item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

export function orderBy<T>(colecao: T[], atributo: keyof T): T[] {
    return colecao.slice().sort((a, b) => {
        if (a[atributo] > b[atributo]) return -1;
        if (a[atributo] < b[atributo]) return 1;
        return 0;
    });
}

export function fold<T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U {
    return array.reduce(reducer, init);
}

export function compose<A, B, C>(f1: (arg: B) => C, f2: (arg: A) => B) {
    return (arg: A): C => f1(f2(arg));
}
