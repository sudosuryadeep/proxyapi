export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "query parameter is required"
    });
  }

  try {
    const url = `${process.env.TG_API_URL}?token=${process.env.TG_API_TOKEN}&query=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json({
      success: true,
      provided_by: "Aerivue",
      telegram: "@aerivue",
      result: data.results || {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      provided_by: "Aerivue",
      telegram: "@aerivue",
      message: "Internal Server Error"
    });
  }
}
