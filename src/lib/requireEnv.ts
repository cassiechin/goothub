export function requireEnv(key: string): string {
    const value = process.env[key];
    if (value == null) {
        throw new Error(`Missing ${key} environnement variable.`);
    }

    return value;
}
