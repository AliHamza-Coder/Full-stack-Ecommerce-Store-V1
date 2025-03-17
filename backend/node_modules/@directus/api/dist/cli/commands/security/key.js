import { randomUUID } from 'node:crypto';
export default async function generateKey() {
    process.stdout.write(randomUUID());
    process.exit(0);
}
