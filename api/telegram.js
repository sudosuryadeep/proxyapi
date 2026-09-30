export default async function handler(req, res) {
  const { tgnum, api_key } = req.query;

  // Required parameters
  if (!tgnum) {
    return res.status(400).json({
      success: false,
      message: "tgnum parameter is required",
      contact: "@aerivue"
    });
  }

  if (!api_key) {
    return res.status(400).json({
      success: false,
      message: "api_key parameter is required",
      contact: "@aerivue"
    });
  }

  try {
    const url =
      `https://death-smg.vercel.app/api/v1/telegram` +
      `?tgnum=${encodeURIComponent(tgnum)}` +
      `&api_key=${encodeURIComponent(api_key)}`;

    const response = await fetch(url);
    const data = await response.json();

    // API response/data missing
    if (!response.ok || !data || data.status !== true) {
      return res.status(404).json({
        success: false,
        message: "Telegram information not found",
        contact: "@aerivue"
      });
    }

    // Only return Telegram ID and verification
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

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      contact: "@aerivue"
    });
  }
}
```

Example output:

```json
{
  "success": true,
  "telegram_id": "1234567890",
  "verification": "ACTIVE"
}
```

Aur agar record/data nahi milta:

```json
{
  "success": false,
  "message": "Telegram information not found",
  "contact": "@aerivue"
}
