import { NextResponse } from "next/server";

export async function POST(req) {
	const { name, tel, school, score,  } = await req.json();
	
	const TELEGRAM_TOKEN = "8466255722:AAHe7pnlWaR0HkIb3eqXcmPXfiYRoD8hbmI";
	const CHAT_ID = '2019586541';
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
