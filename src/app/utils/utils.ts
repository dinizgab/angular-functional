export function distinct<T>(colecao: T[], atributo: string): T[] {
    const seen = new Set();
    return colecao.filter(item => {
        const keys = atributo.split('.');
        const value = keys.reduce((o: any, k: string) => o[k], item);
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

export function orderByName<T>(colecao: T[], atributo: string): T[] {
    return colecao.slice().sort((a, b) => {
        const keys = atributo.split('.');
        const aValue = keys.reduce((acc: any, key) => acc[key], a);
        const bValue = keys.reduce((acc: any, key) => acc[key], b);

        return aValue.localeCompare(bValue);
    });
}

export function orderBy<T>(colecao: T[], atributo: string): T[] {
    return colecao.slice().sort((a, b) => {
        const keys = atributo.split('.');
        const aValue = keys.reduce((acc: any, key) => acc[key], a);
        const bValue = keys.reduce((acc: any, key) => acc[key], b);

        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
    });
}

// export function fold<T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U {
//     return array.reduce(reducer, init);
// }

export function compose<A, B, C>(f1: (arg: B) => C, f2: (arg: A) => B) {
    return (arg: A): C => f1(f2(arg));
}
