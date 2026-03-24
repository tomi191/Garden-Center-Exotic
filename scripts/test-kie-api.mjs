/**
 * Test KIE AI API Response Format
 */

const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';

async function testAPI() {
  console.log('Testing KIE AI API...\n');

  const requestBody = {
    prompt: 'A single beautiful red rose with water droplets on a white background, professional product photography',
    aspectRatio: '1:1'
  };

  try {
    console.log('1. Sending request to 4o Image API...');
    const response = await fetch('https://api.kie.ai/api/v1/gpt4o-image/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIE_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`   Status: ${response.status}`);

    const result = await response.json();
    console.log('\n2. Response body:');
    console.log(JSON.stringify(result, null, 2));

    // If we have a task_id, poll for result
    const taskId = result.data?.taskId || result.task_id || result.id || result.taskId;
    if (taskId) {
      console.log(`\n3. Polling for task: ${taskId}`);

      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 3000));

        // Try different endpoint formats
        const pollUrls = [
          `https://api.kie.ai/api/v1/gpt4o-image/record-info?taskId=${taskId}`,
          `https://api.kie.ai/api/v1/gpt4o-image/record-info?task_id=${taskId}`,
          `https://api.kie.ai/api/v1/record-info?taskId=${taskId}`,
        ];

        for (const pollUrl of pollUrls) {
          try {
            const pollResponse = await fetch(pollUrl, {
              headers: {
                'Authorization': `Bearer ${KIE_API_KEY}`
              }
            });

            if (!pollResponse.ok) continue;

            const pollResult = await pollResponse.json();
            const status = pollResult.data?.status || pollResult.status || pollResult.state;
            console.log(`   Poll ${i + 1}: status=${status || 'unknown'}`);
            console.log(`   Full response: ${JSON.stringify(pollResult).substring(0, 200)}`);

            if (status === 'completed' || status === 'success' || status === 'SUCCESS' ||
                pollResult.data?.output || pollResult.data?.images || pollResult.output || pollResult.images) {
              console.log('\n4. Final result:');
              console.log(JSON.stringify(pollResult, null, 2));
              return;
            }

            if (status === 'failed' || status === 'FAILED' || pollResult.error) {
              console.log('   FAILED:', pollResult.error || pollResult.data?.error || 'Unknown error');
              return;
            }

            break; // Found working endpoint
          } catch (e) {
            continue;
          }
        }
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
