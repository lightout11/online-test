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

  console.log(url);
  console.log(req.body);

  const req_body = await req.json();
  console.log(req_body);

  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req_body),
  });

  // console.log(res);

  return res;
}
