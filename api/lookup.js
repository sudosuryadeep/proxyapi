export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "number query required"
    });
  }

  try {
    const url =
      `${process.env.BASE_URL}/lookup?number=${encodeURIComponent(number)}` +
      `&apikey=${process.env.API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
