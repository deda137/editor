export async function changeToLetter(data) {
  console.log(data);
  let url;
  if (data.letter === "tocyr") {
    url = "tocyr";
  }
  if (data.letter === "tolat") {
    url = "tolat";
  }
  console.log("url", url);
  let response = {};
  try {
    response = await fetch(`http://localhost/${url}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "text/html",
        //Authorization: 'Bearer ' + getToken(),
      },
      body: data.data,
    });
    console.log(response);
    return await response;
  } catch (error) {
    const res = Object.assign(response, { error });
    return res;
  }
}
