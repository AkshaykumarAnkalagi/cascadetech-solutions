import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "cascade_admin_session";
const SESSION_DURATION_HOURS = 8;

const ADMIN_USERNAME =
  process.env.ADMIN_USERNAME || "cascadetechnologiessolutions";
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "P4jkbnixj4@";
const ADMIN_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "cascade-erp-admin-secret-hmac-key-2026-secure";

export function verifyAdminCredentials(user: string, pass: string): boolean {
  if (!user || !pass) return false;
  // Timing-safe comparisons
  const userMatch =
    crypto.timingSafeEqual(
      Buffer.from(user.padEnd(64, " ")),
      Buffer.from(ADMIN_USERNAME.padEnd(64, " "))
    ) && user.length === ADMIN_USERNAME.length;

  const passMatch =
    crypto.timingSafeEqual(
      Buffer.from(pass.padEnd(64, " ")),
      Buffer.from(ADMIN_PASSWORD.padEnd(64, " "))
    ) && pass.length === ADMIN_PASSWORD.length;

  return userMatch && passMatch;
}

export function createAdminSessionToken(username: string): string {
  const payload = {
    user: username,
    exp: Date.now() + SESSION_DURATION_HOURS * 3600 * 1000,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(payloadB64)
    .digest("base64url");

  if (signature !== expectedSig) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );
    if (payload.exp && payload.exp > Date.now()) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
