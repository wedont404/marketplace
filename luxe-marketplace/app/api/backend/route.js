import { NextResponse } from "next/server";

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_API_URL;

function buildTargetUrl(requestUrl) {
  const incoming = new URL(requestUrl);
  const target = new URL(APPS_SCRIPT_URL);

  incoming.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  return target.toString();
}

export async function GET(request) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ success: false, error: "Missing APPS_SCRIPT_URL" }, { status: 500 });
  }

  const response = await fetch(buildTargetUrl(request.url), {
    method: "GET",
    cache: "no-store"
  });

  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function POST(request) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ success: false, error: "Missing APPS_SCRIPT_URL" }, { status: 500 });
  }

  const body = await request.text();
  const response = await fetch(buildTargetUrl(request.url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    cache: "no-store"
  });

  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
