export async function DELETE(
  req: Request,
  { params }: { params: { question_id: String } }
) {
  const url = process.env.BACKEND_URL + "/questions/" + params.question_id;

  const res = await fetch(url, { method: "DELETE" });
  return res;
}

export async function PUT(
  req: Request,
  { params }: { params: { question_id: String } }
) {
  const url = process.env.BACKEND_URL + "/questions/" + params.question_id;

  const res = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  return res;
}
