export default function Timer({ timeLeft }: { timeLeft: number }) {
	return (
		<div className={`px-3 py-1 rounded-full text-sm font-medium ${
			timeLeft > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
		}`}>
			{timeLeft}s
		</div>
	);
}
