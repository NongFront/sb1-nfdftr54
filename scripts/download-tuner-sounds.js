import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { get } from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to download file from Google Drive
async function downloadFile(fileId, outputPath) {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      if (response.statusCode === 302) {
        // Follow redirect
        get(response.headers.location, (finalResponse) => {
          const fileStream = createWriteStream(outputPath);
          finalResponse.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        const fileStream = createWriteStream(outputPath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

// Create sounds directory if it doesn't exist
const soundsDir = join(dirname(__dirname), 'public', 'sounds', 'tuner');
if (!existsSync(soundsDir)) {
  mkdirSync(soundsDir, { recursive: true });
}

// Define string sounds mapping
const stringSounds = {
  1: '1EI1WowyPT_0MAEutlp36xpNsqxj5FDES',
  2: '1RinaDvM_o6vZomfEmTDaEXadeF1pNYYw',
  3: '13phefNs-eLHty7ClbwSy5fLURSLdaY7p',
  4: '1Yy2LHg9pdaDStiOqKUtefTntY6Orbccf',
  5: '1I-nnnR1cjxxe7nIdir3qxLlfbQhp27w6',
  6: '1UAQ48Hf15dzw6feHwmYwZfMUBdUW2qFx'
};

// Download all string sounds
async function downloadAllSounds() {
  for (const [string, fileId] of Object.entries(stringSounds)) {
    console.log(`Downloading string ${string} sound...`);
    
    const outputPath = join(soundsDir, `string_${string}.wav`);
    console.log(`Downloading to ${outputPath}`);
    
    try {
      await downloadFile(fileId, outputPath);
      console.log(`Successfully downloaded string ${string}`);
    } catch (error) {
      console.error(`Error downloading string ${string}:`, error);
    }
  }
  
  console.log('All downloads completed!');
}

// Start the download process
downloadAllSounds();