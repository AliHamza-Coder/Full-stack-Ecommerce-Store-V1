export declare const validateBatch: (scope: "read" | "update" | "delete") => (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
