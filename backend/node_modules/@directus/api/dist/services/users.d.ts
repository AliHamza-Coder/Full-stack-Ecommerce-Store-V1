import type { Item, PrimaryKey, RegisterUserInput } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class UsersService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    /**
     * User email has to be unique case-insensitive. This is an additional check to make sure that
     * the email is unique regardless of casing
     */
    private checkUniqueEmails;
    /**
     * Check if the provided password matches the strictness as configured in
     * directus_settings.auth_password_policy
     */
    private checkPasswordPolicy;
    /**
     * Clear users' sessions to log them out
     */
    private clearUserSessions;
    /**
     * Get basic information of user identified by email
     */
    private getUserByEmail;
    /**
     * Create URL for inviting users
     */
    private inviteUrl;
    /**
     * Validate array of emails. Intended to be used with create/update users
     */
    private validateEmail;
    /**
     * Create a new user
     */
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Create multiple new users
     */
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update many users by primary key
     */
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Delete multiple users by primary key
     */
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    inviteUser(email: string | string[], role: string, url: string | null, subject?: string | null): Promise<void>;
    acceptInvite(token: string, password: string): Promise<void>;
    registerUser(input: RegisterUserInput): Promise<void>;
    verifyRegistration(token: string): Promise<string>;
    requestPasswordReset(email: string, url: string | null, subject?: string | null): Promise<void>;
    resetPassword(token: string, password: string): Promise<void>;
    private clearCaches;
}
