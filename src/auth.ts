import { SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"


export const { handle, signIn, signOut } = SvelteKitAuth({

        // secret neede because bug
        secret: "secret",
        useSecureCookies: false,
        trustHost: true,
        basePath: "/auth",

        session: {
            strategy: "jwt",
        },
        providers: [Credentials({
            async authorize(credentials, req) {
                return {user: {name: "testuser", email: "test@mail.com"}};
            },
        })],
        callbacks: {
            jwt: async ({ token, user }) => {
                if (user) {
                    return {
                        access_token: "initial_login_value",
                        access_token_exp: Date.now() + 10000,
                        user: user.user
                    };
                } else if (Date.now() < token.access_token_exp) {
                    // If the access token has not expired yet, return it
                    console.log("token valid")
                    return token
                } else {
                    console.log("refreshing token");

                    const new_expiration = Date.now() + 10000;
                    const access_token = "updated_value";
                    const access_token_exp = new_expiration;
                    return {
                        ...token, // Keep the previous token properties
                        access_token: access_token,
                        access_token_exp: access_token_exp
                    }
                        
                    
                }
                

            },
            session: async ({ session, token }) => {
                return {
                    ...session,
                    user: token.user,
                    accessToken: token.access_token,
                    accessTokenExpiresAt: token.access_token_exp,
                    refreshToken: token.refresh_token,
                    refreshTokenExpiresAt: token.refresh_token_exp,
                };
            }
        }

});