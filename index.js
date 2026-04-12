const delay = ms => new Promise(res => setTimeout(res, ms));

async function testAPI() {
    let totalRequests = 50;
    let totalTokens = 0;

    for (let i = 1; i <= totalRequests; i++) {
        try {
            const response = await fetch('https://Rox-Turbo-API.hf.space/coder7', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: `User ${i}: Explain AI `.repeat(10) }
                    ],
                    max_tokens: 200
                })
            });

            console.log(`\n🧑 Request ${i}/${totalRequests}`);
            console.log("Status:", response.status);

            // ❌ detect limit or error
            if (!response.ok) {
                console.log("❌ Error or limit reached!");
                continue;
            }

            const text = await response.text();

            if (!text) {
                console.log("⚠️ Empty response (possible rate limit)");
                continue;
            }

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                console.log("⚠️ Invalid JSON:", text);
                continue;
            }

            if (!data.content) {
                console.log("⚠️ No content in response:", data);
                continue;
            }

            const length = data.content.length;
            const tokens = Math.ceil(length / 4);
            totalTokens += tokens;

            console.log("Length:", length);
            console.log("Approx Tokens:", tokens);
            console.log("Total Tokens:", totalTokens);

            // 🛑 auto stop if too many tokens (optional safety)
            if (totalTokens > 20000) {
                console.log("🔥 Token limit reached, stopping...");
                break;
            }

            await delay(300);

        } catch (err) {
            console.log(`❌ Error at request ${i}:`, err.message);
            await delay(2000);
        }
    }

    console.log("\n✅ Script finished");
}

testAPI();
