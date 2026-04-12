const delay = ms => new Promise(res => setTimeout(res, ms));

async function testAPI() {
    let totalRequests = 50;

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

            const data = await response.json();

            console.log(`Request ${i}`);
            console.log("Length:", data.content?.length || 0);

            await delay(300);

        } catch (err) {
            console.log("Error", i);
            await delay(2000);
        }
    }

    console.log("Finished batch");
}

testAPI();
