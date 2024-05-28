export async function getGames() {
  const response = await fetch("/gamecollection.json");
  if (!response.ok) {
    console.error("Something went wrong!");
    return;
  }
  const data = await response.json();

  return data;
}
