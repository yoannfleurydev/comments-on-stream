export async function getChannel() {
  const response = await fetch("http://localhost:3001/api/info/channel");

  return response.json();
}
