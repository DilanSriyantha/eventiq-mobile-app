export enum Role {
    ADMIN,
    CONSUMER,
    PROVIDER
};

export namespace Role {

    export function of(name: string): Role | undefined;
    export function of(ordial: number): Role | undefined;

    export function of(val: string | number): Role | undefined {
        if (typeof val === "string")
            return (Role as any)[val.toUpperCase()];

        if (typeof val === "number")
            return (Role[val] as unknown) as Role;

        return undefined;
    }
}