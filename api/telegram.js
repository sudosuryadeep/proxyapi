export default async function handler(req, res) {
  const { tgnum } = req.query;

  if (!tgnum) {
    return res.status(400).json({
      success: false,
      message: "tgnum parameter is required",
      contact: "@aerivue"
    });
  }

  try {
    const url =
      `${process.env.TG_API_URL}` +
      `?tgnum=${encodeURIComponent(tgnum)}` +
      `&api_key=${encodeURIComponent(process.env.TG_API_KEY)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data || data.status !== true) {
      return res.status(404).json({
        success: false,
        message: "Telegram information not found",
        contact: "@aerivue"
      });
    }

    if (!data.telegram_id || !data.verification) {
      return res.status(404).json({
        success: false,
        message: "Required Telegram data not available",
        contact: "@aerivue"
      });
    }

    return res.status(200).json({
      success: true,
      telegram_id: data.telegram_id,
      verification: data.verification
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      contact: "@aerivue"
    });
  }
}
