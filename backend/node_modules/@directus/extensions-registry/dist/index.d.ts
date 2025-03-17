import * as stream_web from 'stream/web';
import { ExtensionType } from '@directus/extensions';
import { z } from 'zod';

interface AccountOptions {
    registry?: string;
}

declare const RegistryAccountResponse: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        username: z.ZodString;
        verified: z.ZodBoolean;
        github_username: z.ZodNullable<z.ZodString>;
        github_avatar_url: z.ZodNullable<z.ZodString>;
        github_name: z.ZodNullable<z.ZodString>;
        github_company: z.ZodNullable<z.ZodString>;
        github_blog: z.ZodNullable<z.ZodString>;
        github_location: z.ZodNullable<z.ZodString>;
        github_bio: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        username: string;
        verified: boolean;
        github_username: string | null;
        github_avatar_url: string | null;
        github_name: string | null;
        github_company: string | null;
        github_blog: string | null;
        github_location: string | null;
        github_bio: string | null;
    }, {
        id: string;
        username: string;
        verified: boolean;
        github_username: string | null;
        github_avatar_url: string | null;
        github_name: string | null;
        github_company: string | null;
        github_blog: string | null;
        github_location: string | null;
        github_bio: string | null;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        username: string;
        verified: boolean;
        github_username: string | null;
        github_avatar_url: string | null;
        github_name: string | null;
        github_company: string | null;
        github_blog: string | null;
        github_location: string | null;
        github_bio: string | null;
    };
}, {
    data: {
        id: string;
        username: string;
        verified: boolean;
        github_username: string | null;
        github_avatar_url: string | null;
        github_name: string | null;
        github_company: string | null;
        github_blog: string | null;
        github_location: string | null;
        github_bio: string | null;
    };
}>;
type RegistryAccountResponse = z.infer<typeof RegistryAccountResponse>;

declare const account: (id: string, options?: AccountOptions) => Promise<{
    data: {
        id: string;
        username: string;
        verified: boolean;
        github_username: string | null;
        github_avatar_url: string | null;
        github_name: string | null;
        github_company: string | null;
        github_blog: string | null;
        github_location: string | null;
        github_bio: string | null;
    };
}>;

interface DescribeOptions {
    registry?: string;
}

declare const RegistryDescribeResponse: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodUnion<[z.ZodNull, z.ZodString]>;
        total_downloads: z.ZodNumber;
        downloads: z.ZodUnion<[z.ZodNull, z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            date: string;
            count: number;
        }, {
            date: string;
            count: number;
        }>, "many">]>;
        verified: z.ZodBoolean;
        readme: z.ZodUnion<[z.ZodNull, z.ZodString]>;
        type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme", "hook", "endpoint", "operation", "bundle"]>;
        license: z.ZodNullable<z.ZodString>;
        versions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            version: z.ZodString;
            verified: z.ZodBoolean;
            type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme", "hook", "endpoint", "operation", "bundle"]>;
            host_version: z.ZodString;
            publish_date: z.ZodString;
            unpacked_size: z.ZodNumber;
            file_count: z.ZodNumber;
            url_bugs: z.ZodUnion<[z.ZodNull, z.ZodString]>;
            url_homepage: z.ZodUnion<[z.ZodNull, z.ZodString]>;
            url_repository: z.ZodUnion<[z.ZodNull, z.ZodString]>;
            license: z.ZodNullable<z.ZodString>;
            publisher: z.ZodObject<{
                id: z.ZodString;
                username: z.ZodString;
                verified: z.ZodBoolean;
                github_name: z.ZodNullable<z.ZodString>;
                github_avatar_url: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            }, {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            }>;
            bundled: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                name: string;
            }, {
                type: string;
                name: string;
            }>, "many">;
            maintainers: z.ZodNullable<z.ZodArray<z.ZodObject<{
                accounts_id: z.ZodObject<{
                    id: z.ZodString;
                    username: z.ZodString;
                    verified: z.ZodBoolean;
                    github_name: z.ZodNullable<z.ZodString>;
                    github_avatar_url: z.ZodNullable<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                }, {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                }>;
            }, "strip", z.ZodTypeAny, {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }, {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }, {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        downloads: {
            date: string;
            count: number;
        }[] | null;
        readme: string | null;
        license: string | null;
        versions: {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }[];
    }, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        downloads: {
            date: string;
            count: number;
        }[] | null;
        readme: string | null;
        license: string | null;
        versions: {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        downloads: {
            date: string;
            count: number;
        }[] | null;
        readme: string | null;
        license: string | null;
        versions: {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }[];
    };
}, {
    data: {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        downloads: {
            date: string;
            count: number;
        }[] | null;
        readme: string | null;
        license: string | null;
        versions: {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }[];
    };
}>;
type RegistryDescribeResponse = z.infer<typeof RegistryDescribeResponse>;

declare const describe: (id: string, options?: DescribeOptions) => Promise<{
    data: {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        downloads: {
            date: string;
            count: number;
        }[] | null;
        readme: string | null;
        license: string | null;
        versions: {
            version: string;
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
            id: string;
            verified: boolean;
            license: string | null;
            host_version: string;
            publish_date: string;
            unpacked_size: number;
            file_count: number;
            url_bugs: string | null;
            url_homepage: string | null;
            url_repository: string | null;
            publisher: {
                id: string;
                username: string;
                verified: boolean;
                github_avatar_url: string | null;
                github_name: string | null;
            };
            bundled: {
                type: string;
                name: string;
            }[];
            maintainers: {
                accounts_id: {
                    id: string;
                    username: string;
                    verified: boolean;
                    github_avatar_url: string | null;
                    github_name: string | null;
                };
            }[] | null;
        }[];
    };
}>;

interface DownloadOptions {
    registry?: string;
}

declare const download: (versionId: string, requireSandbox?: boolean, options?: DownloadOptions) => Promise<stream_web.ReadableStream<any> | null>;

interface ListOptions {
    registry?: string;
}

interface ListQuery {
    type?: ExtensionType;
    search?: string;
    limit?: number;
    offset?: number;
    by?: string;
    sort?: 'popular' | 'recent' | 'downloads';
    sandbox?: boolean;
}

declare const RegistryListResponse: z.ZodObject<{
    meta: z.ZodObject<{
        filter_count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        filter_count: number;
    }, {
        filter_count: number;
    }>;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodUnion<[z.ZodNull, z.ZodString]>;
        total_downloads: z.ZodNumber;
        verified: z.ZodBoolean;
        type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme", "hook", "endpoint", "operation", "bundle"]>;
        last_updated: z.ZodString;
        host_version: z.ZodString;
        sandbox: z.ZodBoolean;
        license: z.ZodNullable<z.ZodString>;
        publisher: z.ZodObject<{
            username: z.ZodString;
            verified: z.ZodBoolean;
            github_name: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            username: string;
            verified: boolean;
            github_name: string | null;
        }, {
            username: string;
            verified: boolean;
            github_name: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        license: string | null;
        host_version: string;
        publisher: {
            username: string;
            verified: boolean;
            github_name: string | null;
        };
        sandbox: boolean;
        last_updated: string;
    }, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        license: string | null;
        host_version: string;
        publisher: {
            username: string;
            verified: boolean;
            github_name: string | null;
        };
        sandbox: boolean;
        last_updated: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        license: string | null;
        host_version: string;
        publisher: {
            username: string;
            verified: boolean;
            github_name: string | null;
        };
        sandbox: boolean;
        last_updated: string;
    }[];
    meta: {
        filter_count: number;
    };
}, {
    data: {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        license: string | null;
        host_version: string;
        publisher: {
            username: string;
            verified: boolean;
            github_name: string | null;
        };
        sandbox: boolean;
        last_updated: string;
    }[];
    meta: {
        filter_count: number;
    };
}>;
type RegistryListResponse = z.infer<typeof RegistryListResponse>;

declare const list: (query: ListQuery, options?: ListOptions) => Promise<{
    data: {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme" | "hook" | "endpoint" | "operation" | "bundle";
        id: string;
        verified: boolean;
        name: string;
        description: string | null;
        total_downloads: number;
        license: string | null;
        host_version: string;
        publisher: {
            username: string;
            verified: boolean;
            github_name: string | null;
        };
        sandbox: boolean;
        last_updated: string;
    }[];
    meta: {
        filter_count: number;
    };
}>;

export { type AccountOptions, type DescribeOptions, type DownloadOptions, type ListOptions, type ListQuery, RegistryAccountResponse, RegistryDescribeResponse, RegistryListResponse, account, describe, download, list };
