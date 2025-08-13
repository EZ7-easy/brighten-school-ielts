import { NextResponse } from "next/server";

export async function POST(req) {
	const { name, tel, school, score,  } = await req.json();
	
	const TELEGRAM_TOKEN = "8026261514:AAHiQ0nCdNVInbpcM_6Lu2w_iYMMpZiNyRE";
	const CHAT_ID = '1764737921';
	const message = `📚 New Signup:
	Name: ${name}
	Phone: ${tel}
	School: ${school}
	Test Score: ${score}`;
	
	await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
	});
	
	return NextResponse.json({ ok: true });
}
