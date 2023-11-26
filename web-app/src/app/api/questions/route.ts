export async function GET(req: Request) {
  const url = process.env.BACKEND_URL + "/questions/";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return res;
}
