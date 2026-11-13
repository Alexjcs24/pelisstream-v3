import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Endpoint de Resolución de Streams Directos (HLS .m3u8)
 * Permite servir streams al NativePlayer (Vidstack) sin anuncios ni iframes.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id, type = "movie", season = "1", episode = "1" } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing required parameter: id (IMDb or TMDB)" });
  }

  try {
    // Lista de proveedores de stream directo comunitarios / extractores
    // Si un extractor devuelve streams .m3u8 limpios, se entregan al NativePlayer
    return res.status(200).json({
      success: true,
      direct: false, // fallback a iframe si no hay m3u8 directo aún
      sources: [],
      subtitles: [],
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Extraction error" });
  }
}
