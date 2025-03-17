export default function rolesCreate({ role: name, admin, app, }: {
    role: string;
    admin: boolean;
    app: boolean;
}): Promise<void>;
