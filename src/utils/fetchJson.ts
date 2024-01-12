export default async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Received invalid response from the server");
  }

  return response.json();
}