/**
 * Test SORA 2 API with correct KIE AI endpoints
 * Based on: https://docs.kie.ai/market/sora2/sora-2-text-to-video
 */

const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';
const KIE_API_BASE = 'https://api.kie.ai';

async function testSora2() {
  console.log('🔍 Testing SORA 2 with correct KIE AI endpoints...\n');

  const requestBody = {
    model: 'sora-2-text-to-video',
    input: {
      prompt: 'A single beautiful red rose with water droplets slowly rotating, professional studio lighting, 4K quality',
      aspect_ratio: 'portrait',
      n_frames: '10',
      remove_watermark: true
    }
  };

  console.log('Request body:', JSON.stringify(requestBody, null, 2));
  console.log('\nSending to: POST', KIE_API_BASE + '/api/v1/jobs/createTask\n');

  try {
    const response = await fetch(`${KIE_API_BASE}/api/v1/jobs/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIE_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Status:', response.status);
    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));

    if (result.code === 200 && result.data?.taskId) {
      console.log('\n✅ Task created successfully!');
      console.log('Task ID:', result.data.taskId);
      console.log('\nPolling for result...\n');

      // Poll for result
      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 5000));

        const pollResponse = await fetch(
          `${KIE_API_BASE}/api/v1/jobs/recordInfo?taskId=${result.data.taskId}`,
          {
            headers: { 'Authorization': `Bearer ${KIE_API_KEY}` }
          }
        );

        const pollResult = await pollResponse.json();
        const state = pollResult.data?.state;

        console.log(`Poll ${i + 1}: state=${state}`);

        if (state === 'success') {
          console.log('\n✅ Video generation complete!');
          console.log('Full result:', JSON.stringify(pollResult.data, null, 2));

          if (pollResult.data?.resultJson) {
            const resultData = JSON.parse(pollResult.data.resultJson);
            console.log('\nVideo URLs:', resultData.resultUrls);
          }
          return;
        }

        if (state === 'fail') {
          console.log('\n❌ Video generation failed');
          console.log('Error:', pollResult.data?.failMsg || pollResult.data?.failCode);
          return;
        }
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSora2();
