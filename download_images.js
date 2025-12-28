
const fs = require('fs');
const path = require('path');
const https = require('https');

const products = [
  {
    id: "rose-red-colombia",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rose-white-colombia",
    image: "https://images.unsplash.com/photo-1561359934-84d7e5a9855f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "carnation-mix-colombia",
    image: "https://images.unsplash.com/photo-1551897373-41ec64e6d284?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rose-pink-kenya",
    image: "https://images.unsplash.com/photo-1572097662698-8f4b67b4b06a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "alstroemeria-kenya",
    image: "https://images.unsplash.com/photo-1601985705806-5b1790d0cc9e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "tulip-red-netherlands",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "tulip-yellow-netherlands",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gerbera-netherlands",
    image: "https://images.unsplash.com/photo-1587814213271-7a66ceb0193c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "orchid-phalaenopsis-white",
    image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "orchid-phalaenopsis-pink",
    image: "https://images.unsplash.com/photo-1532188363366-3a0ac90c3b96?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "monstera-deliciosa",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ficus-lyrata",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sansevieria-trifasciata",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "olive-tree-greece",
    image: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "lavender-greece",
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "geranium-turkey",
    image: "https://images.unsplash.com/photo-1593691509545-38c86c65d3ad?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "petunia-turkey",
    image: "https://images.unsplash.com/photo-1592577474990-2389e56bbcae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rose-damascena-bulgaria",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "lavender-bulgaria",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rose-bush-bulgaria",
    image: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?q=80&w=800&auto=format&fit=crop",
  },
];

const downloadDir = path.join(__dirname, 'public', 'images', 'products');

if (!fs.existsSync(downloadDir)){
    fs.mkdirSync(downloadDir, { recursive: true });
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

async function downloadAll() {
  console.log('Starting download...');
  for (const product of products) {
    const filename = `${product.id}.jpg`;
    const filepath = path.join(downloadDir, filename);
    try {
      await downloadImage(product.image, filepath);
      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error(`Failed to download ${filename}: ${error.message}`);
    }
  }
  console.log('Download complete!');
}

downloadAll();
