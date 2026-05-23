const fs = require('fs');
const path = require('path');

const referencedFiles = [
  'regenerated_image_1779408921933.png',
  'regenerated_image_1779409373917.png',
  'regenerated_image_1779409409989.png',
  'regenerated_image_1779409532178.png',
  'regenerated_image_1779409817532.png',
  'regenerated_image_1779409823567.png',
  'regenerated_image_1779409850202.png',
  'regenerated_image_1779343098956.png',
  'regenerated_image_1779343196172.png',
  'regenerated_image_1777987826245.png',
  'regenerated_image_1777987859069.png',
  'regenerated_image_1778157281116.png',
  'regenerated_image_1777987878599.png',
  'regenerated_image_1779408918460.png',
  'work_insights_illustrations_1779410458171.png',
  'regenerated_image_1778551850611.png'
];

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(ent => {
    const fullPath = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      cleanDir(fullPath);
      // If the directory is now empty or has a nested empty directory, remove it
      if (fs.readdirSync(fullPath).length === 0) {
        console.log(`Removing empty directory: ${fullPath}`);
        fs.rmdirSync(fullPath);
      }
    } else if (ent.isFile()) {
      const filename = ent.name;
      if (!referencedFiles.includes(filename)) {
        console.log(`Deleting unreferenced file: ${fullPath}`);
        fs.unlinkSync(fullPath);
      }
    }
  });
}

console.log('=== Cleaning unreferenced images in src/assets/images ===');
cleanDir(path.join(__dirname, '..', 'src', 'assets', 'images'));

console.log('=== Cleaning unreferenced images in public/assets/images ===');
cleanDir(path.join(__dirname, '..', 'public', 'assets', 'images'));

console.log('=== Cleanup complete ===');
