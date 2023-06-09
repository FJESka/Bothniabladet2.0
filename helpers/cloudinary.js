import { config } from 'pages/config';

export async function search(query = {}) {

  const paramString = query;

  const results = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudiary.CLOUD_NAME}/resources/search/`, {
    headers: {
      Authorization: `Basic ${Buffer.from(config.cloudiary.API_KEY + ':' + config.cloudiary.API_SECRET).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query),
    method: 'POST'
  }).then(r => r.json());

  console.log.results;

  return results;
}


export function mapImageResources(resources) {
  if (!Array.isArray(resources)) {
    console.error('Invalid resources array');
    return [];
  }

  return resources.map(resource => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });
}
