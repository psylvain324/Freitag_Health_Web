import { createTRPCReact } from "@trpc/react-query";

// AppRouter: when server/routers exists, import from there; else use any (client-only or server absent).
export type AppRouter = any;

// Workaround: tRPC's collision check can misfire, producing an error union instead of the real type.
// Our router (system, auth, leads) has no reserved names (useContext, useUtils, Provider).
export const trpc = createTRPCReact<AppRouter>() as any;
