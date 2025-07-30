export async function fetchWikipediaData(title: string): Promise<{
  thumbnail?: string;
  extract?: string;
} | null> {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      title
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    

    return data?.thumbnail?.source || data?.extract
      ? {
          thumbnail: data?.thumbnail?.source ?? null,
          extract: data?.extract ?? null,
        }
      : null;
  } catch (err) {
    console.error("Wikipedia fetch failed for:", title, err);
    return null;
  }
}
