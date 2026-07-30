export default async function handler(req, res) {
  const { aadhar } = req.query;

  if (!aadhar) {
    return res.status(400).json({
      success: false,
      message: "aadhar query parameter is required",
    });
  }

  try {
    const url = `${process.env.AADHAR_API_URL}?aadhar=${encodeURIComponent(
      aadhar
    )}&apikey=${process.env.AADHAR_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Remove upstream branding
    delete data.credit;
    delete data.developer;

    // Add your branding
    const result = {
      ...data,
      credit: "@Aerivue",
      developer: "@Aerivue",
      provided_by: "@Aerivue",
    };

    return res.status(response.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      credit: "@Aerivue",
      developer: "@Aerivue",
      provided_by: "@Aerivue",
      message: "Internal Server Error",
    });
  }
}
