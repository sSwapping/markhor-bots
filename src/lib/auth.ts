/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

async function syncUserToConvex(payload: Record<string, any>) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${getBaseUrl()}/api/convex/sync-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await res.text().catch(() => "");

    if (!res.ok) {
      console.error(
        "[sync-user] Failed",
        res.status,
        res.statusText,
        text || "(no body)"
      );
      return;
    }
  } catch (error) {
    console.error("[sync-user] Error", error);
  } finally {
    clearTimeout(timeoutId);
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.username = profile.username;
        token.avatar = profile.avatar;
        token.guilds = profile.guilds;
        token.global_name = profile.global_name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      (session.user as any).username = token.username as string;
      (session.user as any).avatar = token.avatar as string | null;
      (session.user as any).guilds = token.guilds as any[] | undefined;
      (session.user as any).global_name = token.global_name as
        | string
        | undefined;
      return session;
    },
  },

  events: {
    async signIn({ user, account, profile }) {
      const payload = {
        discordId: String((profile as any)?.id ?? (user as any)?.id ?? ""),
        isPremium: false,
        experiationDatePremium: 0, // default als je (nog) geen premiumlogica hebt
        discordBotToken: "",
      };

      if (!payload.discordId) {
        console.error("[sync-user] Missing required field", {
          hasDiscordId: Boolean(payload.discordId),
        });
        return;
      }

      await syncUserToConvex(payload);
    },
  },
});
