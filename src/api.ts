function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

const originUrl = "https://nws-main.hove.io";
const clientName = "divia";

async function generateToken(): Promise<string> {
  const enc = new TextEncoder();
  const originMaterial = enc.encode(originUrl);

  const baseKey = await crypto.subtle.importKey(
    "raw",
    originMaterial,
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  const salt = enc.encode("mon-sel-fixe-ou-dynamique");

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 1e5,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  const payload = {
    clientName: clientName,
    tokenId: crypto.randomUUID(),
    iat: Math.floor(Date.now() / 1000),
  };

  const payloadBytes = enc.encode(JSON.stringify(payload));

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    payloadBytes,
  );

  const base64Iv = bufferToBase64(iv);
  const base64Ciphertext = bufferToBase64(ciphertextBuffer);

  return `${base64Iv}.${base64Ciphertext}`;
}

export async function fetchData({
  pathname,
  query = {},
  referrerUrl,
}: {
  pathname: string;
  query?: Record<string, string>;
  referrerUrl?: string;
}): Promise<any> {
  // Generate token
  const token = await generateToken();

  // Get presigned URL
  const res = await fetch(
    `${originUrl}/api/presign`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": token,
        Origin: originUrl,
      },
      referrer: referrerUrl || `${originUrl}/standalone/schedules/divia`,
      body: JSON.stringify({
        clientName,
        method: "POST",
        path: pathname,
        query,
      }),
    },
  ).then((res) => res.json());
  const { url: presignedUrl } = res as { url: string };

  // Fetch data using presigned URL
  return await fetch(`${originUrl}/api/proxy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({
      clientName,
      href: `https://api.navitia.io${pathname}?${new URLSearchParams(query).toString()}`,
      presignedUrl,
    }),
  }).then((res) => res.json());
}
