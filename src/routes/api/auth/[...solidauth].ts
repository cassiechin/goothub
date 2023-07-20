import {SolidAuth, type SolidAuthConfig} from "@solid-auth/base";
import GitHub from "@auth/core/providers/github";

export const authOpts: SolidAuthConfig = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),

    ],
    debug: true
};

export const {GET, POST} = SolidAuth(authOpts);