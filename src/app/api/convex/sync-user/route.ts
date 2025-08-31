import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const body = await request.json();

  const payload = {
    discordId: String(body.discordId ?? ""),
    isPremium: Boolean(body.isPremium),
    experiationDatePremium:
      typeof body.experiationDatePremium === "number"
        ? body.experiationDatePremium
        : 0,
    discordBotToken: String(body.discordBotToken ?? ""),
  };

  if (!payload.discordId) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing discordId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await convex.mutation(api.users.saveUser, {
    discordId: body.discordId,
    isPremium: body.isPremium,
    experiationDatePremium: body.expirationDatePremium,
    discordBotToken: body.discordBotToken,
  });

  return NextResponse.json({ ok: true });
}
