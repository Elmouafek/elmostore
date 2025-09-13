export async function handler(event, context) {
  const token = process.env.PRINTFUL_TOKEN; // 🔑 ضع التوكن في إعدادات Netlify (مش في الكود)
  
  try {
    const response = await fetch("https://api.printful.com/store", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
