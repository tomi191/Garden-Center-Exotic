
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'products');

const copyFile = (source, target) => {
    try {
        fs.copyFileSync(path.join(dir, source), path.join(dir, target));
        console.log(`Copied ${source} to ${target}`);
    } catch (e) {
        console.error(`Error copying ${source} to ${target}:`, e.message);
    }
};

// Fallbacks map
const fallbacks = {
    'rose-white-colombia.jpg': 'rose-red-colombia.jpg',
    'carnation-mix-colombia.jpg': 'tulip-red-netherlands.jpg',
    'rose-pink-kenya.jpg': 'rose-red-colombia.jpg',
    'alstroemeria-kenya.jpg': 'tulip-yellow-netherlands.jpg',
    'gerbera-netherlands.jpg': 'tulip-red-netherlands.jpg',
    'orchid-phalaenopsis-pink.jpg': 'orchid-phalaenopsis-white.jpg',
    'geranium-turkey.jpg': 'lavender-greece.jpg',
    'petunia-turkey.jpg': 'lavender-greece.jpg'
};

Object.keys(fallbacks).forEach(target => {
    if (!fs.existsSync(path.join(dir, target))) {
        copyFile(fallbacks[target], target);
    }
});
