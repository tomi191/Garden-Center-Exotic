/**
 * Test SORA 2 API endpoints on KIE AI
 */

const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';

async function testSora2CreateTask() {
  console.log('🔍 Testing SORA 2 endpoints...\n');

  const requestBody = {
    prompt: 'A beautiful red rose with water droplets, cinematic lighting',
    aspect_ratio: 'portrait',
    n_frames: '10',
    remove_watermark: true
  };

  // Try different endpoint variations
  const endpoints = [
    'https://api.kie.ai/api/v1/sora2/createTask',
    'https://api.kie.ai/api/v1/sora-2/createTask',
    'https://api.kie.ai/api/sora2/createTask',
    'https://api.kie.ai/sora2/createTask',
    'https://api.kie.ai/createTask',
    'https://api.kie.ai/api/v1/createTask',
    'https://api.kie.ai/api/v1/video/sora2/createTask',
    'https://api.kie.ai/api/v1/video/createTask',
  ];

  for (const endpoint of endpoints) {
    try {
      console.log('Testing:', endpoint);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KIE_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

      const status = response.status;
      const result = await response.json().catch(() => ({}));
      console.log('  Status:', status);

      if (status !== 404) {
        console.log('  Response:', JSON.stringify(result, null, 2));
        if (status === 200 || result.taskId || result.data?.taskId) {
          console.log('\n✅ Found working endpoint!');
          break;
        }
      }
      console.log('');
    } catch (e) {
      console.log('  Error:', e.message, '\n');
    }
  }
}

testSora2CreateTask();
