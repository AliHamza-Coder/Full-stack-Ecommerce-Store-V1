export function createDefaultAccountability(overrides) {
    return {
        role: null,
        user: null,
        roles: [],
        admin: false,
        app: false,
        ip: null,
        ...overrides,
    };
}
