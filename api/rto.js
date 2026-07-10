export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "number query parameter is required"
    });
  }

  try {
    const url = `${process.env.RTO_API_URL}?key=${process.env.RTO_API_KEY}&number=${encodeURIComponent(number)}`;

    const response = await fetch(url);
    const data = await response.json();

    // Remove upstream branding
    delete data.developer;
    delete data.developer_footer;

    // Add your branding
    const result = {
      developer: "@Aerivue",
      provided_by: "@Aerivue",
      ...data
    };

    return res.status(response.status).json(result);

  } catch (err) {
    return res.status(500).json({
      success: false,
      developer: "@Aerivue",
      provided_by: "@Aerivue",
      message: "Internal Server Error"
    });
  }
}
