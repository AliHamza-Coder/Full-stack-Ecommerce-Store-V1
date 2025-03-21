// src/modules/account/account.ts
import ky2 from "ky";

// src/utils/assert-version-compatibility.ts
import { OutOfDateError } from "@directus/errors";

// src/constants.ts
var DEFAULT_REGISTRY = "https://registry.directus.io";
var SUPPORTED_VERSION = "2024-01-29";

// src/utils/get-api-version.ts
import ky from "ky";

// src/schemas/registry-version-response.ts
import { z } from "zod";
var RegistryVersionResponse = z.object({
  version: z.string()
});

// src/utils/get-api-version.ts
var _cache = /* @__PURE__ */ new Map();
var getApiVersion = async (options) => {
  const registry = options?.registry ?? DEFAULT_REGISTRY;
  if (_cache.has(registry)) {
    return _cache.get(registry);
  }
  const response = await ky.get(new URL("/version", registry)).json();
  const { version } = await RegistryVersionResponse.parseAsync(response);
  _cache.set(registry, version);
  setTimeout(() => _cache.delete(registry), 6 * 60 * 60 * 1e3);
  return _cache.get(registry);
};

// src/utils/assert-version-compatibility.ts
var assertVersionCompatibility = async (options) => {
  const version = await getApiVersion(options);
  if (version !== SUPPORTED_VERSION) {
    throw new OutOfDateError();
  }
};

// src/modules/account/lib/construct-url.ts
var constructUrl = (id, options) => {
  const registry = options?.registry ?? DEFAULT_REGISTRY;
  const url = new URL(`/accounts/${id}`, registry);
  return url;
};

// src/modules/account/schemas/registry-account-response.ts
import { z as z2 } from "zod";
var RegistryAccountResponse = z2.object({
  data: z2.object({
    id: z2.string(),
    username: z2.string(),
    verified: z2.boolean(),
    github_username: z2.string().nullable(),
    github_avatar_url: z2.string().nullable(),
    github_name: z2.string().nullable(),
    github_company: z2.string().nullable(),
    github_blog: z2.string().nullable(),
    github_location: z2.string().nullable(),
    github_bio: z2.string().nullable()
  })
});

// src/modules/account/account.ts
var account = async (id, options) => {
  await assertVersionCompatibility(options);
  const url = constructUrl(id, options);
  const response = await ky2.get(url).json();
  return await RegistryAccountResponse.parseAsync(response);
};

// src/modules/describe/describe.ts
import ky3 from "ky";

// src/modules/describe/lib/construct-url.ts
var constructUrl2 = (id, options) => {
  const registry = options?.registry ?? DEFAULT_REGISTRY;
  const url = new URL(`/extensions/${id}`, registry);
  return url;
};

// src/modules/describe/schemas/registry-describe-response.ts
import { EXTENSION_TYPES } from "@directus/extensions";
import { z as z3 } from "zod";
var RegistryDescribeResponse = z3.object({
  data: z3.object({
    id: z3.string(),
    name: z3.string(),
    description: z3.union([z3.null(), z3.string()]),
    total_downloads: z3.number(),
    downloads: z3.union([
      z3.null(),
      z3.array(
        z3.object({
          date: z3.string(),
          count: z3.number()
        })
      )
    ]),
    verified: z3.boolean(),
    readme: z3.union([z3.null(), z3.string()]),
    type: z3.enum(EXTENSION_TYPES),
    license: z3.string().nullable(),
    versions: z3.array(
      z3.object({
        id: z3.string(),
        version: z3.string(),
        verified: z3.boolean(),
        type: z3.enum(EXTENSION_TYPES),
        host_version: z3.string(),
        publish_date: z3.string(),
        unpacked_size: z3.number(),
        file_count: z3.number(),
        url_bugs: z3.union([z3.null(), z3.string()]),
        url_homepage: z3.union([z3.null(), z3.string()]),
        url_repository: z3.union([z3.null(), z3.string()]),
        license: z3.string().nullable(),
        publisher: z3.object({
          id: z3.string(),
          username: z3.string(),
          verified: z3.boolean(),
          github_name: z3.string().nullable(),
          github_avatar_url: z3.string().nullable()
        }),
        bundled: z3.array(
          z3.object({
            name: z3.string(),
            type: z3.string()
          })
        ),
        maintainers: z3.array(
          z3.object({
            accounts_id: z3.object({
              id: z3.string(),
              username: z3.string(),
              verified: z3.boolean(),
              github_name: z3.string().nullable(),
              github_avatar_url: z3.string().nullable()
            })
          })
        ).nullable()
      })
    )
  })
});

// src/modules/describe/describe.ts
var describe = async (id, options) => {
  await assertVersionCompatibility(options);
  const url = constructUrl2(id, options);
  const response = await ky3.get(url).json();
  return await RegistryDescribeResponse.parseAsync(response);
};

// src/modules/download/download.ts
import ky4 from "ky";

// src/modules/download/lib/construct-url.ts
var constructUrl3 = (versionId, requireSandbox = false, options) => {
  const registry = options?.registry ?? DEFAULT_REGISTRY;
  const url = new URL(`/download/${versionId}`, registry);
  if (requireSandbox) {
    url.searchParams.set("sandbox", "true");
  }
  return url;
};

// src/modules/download/download.ts
var download = async (versionId, requireSandbox = false, options) => {
  await assertVersionCompatibility(options);
  const url = constructUrl3(versionId, requireSandbox, options);
  const response = await ky4.get(url);
  return response.body;
};

// src/modules/list/list.ts
import ky5 from "ky";

// src/modules/list/lib/construct-url.ts
var constructUrl4 = (query, options) => {
  const registry = options?.registry ?? DEFAULT_REGISTRY;
  const url = new URL("/extensions", registry);
  if (query.search) {
    url.searchParams.set("search", query.search);
  }
  if (query.type) {
    url.searchParams.set("type", query.type);
  }
  if (query.limit) {
    url.searchParams.set("limit", String(query.limit));
  }
  if (query.offset) {
    url.searchParams.set("offset", String(query.offset));
  }
  if (query.by) {
    url.searchParams.set("by", query.by);
  }
  if (query.sort) {
    url.searchParams.set("sort", query.sort);
  }
  if (query.sandbox) {
    url.searchParams.set("sandbox", "true");
  }
  return url;
};

// src/modules/list/schemas/registry-list-response.ts
import { EXTENSION_TYPES as EXTENSION_TYPES2 } from "@directus/extensions";
import { z as z4 } from "zod";
var RegistryListResponse = z4.object({
  meta: z4.object({
    filter_count: z4.number()
  }),
  data: z4.array(
    z4.object({
      id: z4.string(),
      name: z4.string(),
      description: z4.union([z4.null(), z4.string()]),
      total_downloads: z4.number(),
      verified: z4.boolean(),
      type: z4.enum(EXTENSION_TYPES2),
      last_updated: z4.string(),
      host_version: z4.string(),
      sandbox: z4.boolean(),
      license: z4.string().nullable(),
      publisher: z4.object({
        username: z4.string(),
        verified: z4.boolean(),
        github_name: z4.string().nullable()
      })
    })
  )
});

// src/modules/list/list.ts
var list = async (query, options) => {
  await assertVersionCompatibility(options);
  const url = constructUrl4(query, options);
  const response = await ky5.get(url).json();
  return await RegistryListResponse.parseAsync(response);
};
export {
  account,
  describe,
  download,
  list
};
