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
const soundsDir = join(dirname(__dirname), 'public', 'sounds');
if (!existsSync(soundsDir)) {
  mkdirSync(soundsDir, { recursive: true });
}

// Define chord sounds mapping
const chordSounds = {
  Em: {
    6: '16YCW4Ez_IHktlS4WG0vuOVA9igqxlpxn',
    5: '1D_d6O-nPKr-zxXamU6jEyxNSD9BUOs9m',
    4: '1Z9E0By--Wk8nswzp32XvSHMMBHEv2edT',
    3: '1r0sDBT-sT6UkDTBSh2uJ0OxNaxFv9VS1',
    2: '1DBdQFkZLSMihorCbmgiX-UYtk9CuB0Ga',
    1: '1dQUsYWLSpcXSzYPrsYlafa98nSgq9gWu'
  },
  B: {
    3: '1ome0lobTSGnahbRMBA2FSAqoascYZ4h_',
    2: '12NJsBBeVyC79rJvF-ujfpdDJhjNQRiUR',
    1: '1dU6KBwJZyzmZrTTH3zUK1VSEzdnVeIUw'
  },
  Am: {
    5: '19LzX2ah6V-5cvKKginzGWEgdPKnk_2-U',
    4: '1_W0AjiYZ6-2NOThHl1e1TPCm7lBBq8B-',
    3: '1L_FE0HTs2BOIrsIRSrMPmxPyPEJuiZa5',
    2: '1Br49LjysPJLWGdf0IPmaqOeVWF_dYYC1',
    1: '1quQd6d_74twZ2hGC-TjNe15IOZF6wXGr'
  },
  D: {
    4: '1tIUezTMb3sGfYxDwqA_8drvjM5jWv4tp',
    3: '19hsSrTV7Yo27TpH_lsDhRhXIW3xbyYIo',
    2: '1XZXtIAPAXfkqtc4TQ4nJ52VwGR9s7k7e',
    1: '1USFVINkD5ncEnZaQX8bDCQ0oMaPxuu8n'
  },
  C: {
    5: '19vQ2DY_2a6qmHFqm-L_ShlaPaG0X3Zcz',
    4: '1YMw8uJo-a82ORRTaXzBo3Acjy2hEw8Uz',
    3: '1hSi4OH5Hp8zs4KNtwHY5HEj2wIsaGUYI',
    2: '1hvZY26nbXTmkXnCRzPHM3MmM_DtZpfJe',
    1: '1dcPujrsNFj4qP6bGPG7WGK3Jy8Qf8KLA'
  },
  F: {
    5: '1xTjcBkQvJ2aU6RRbXwHTGgAtNbHPDDab',
    4: '10yAwZyFA4O6Hu0ApDmJEwNPslqNZWa6f',
    3: '1NZGeMHO_xaLSsNakhCGOQWD890S3qcGk',
    2: '1nvj-HaDR9wzUZARjAdUU6jQto00IqoB3'
  },
  Fm: {
    3: '194e1rXAtmiqWchi3COLq5V9lPDinPZi8',
    2: '1N8Ac1fB9_NFFXRJEzYT_S1KJrsjJ2eEd',
    1: '1vpBsiZ3CUG5FJpGYW96XLptzAGVNFgaB'
  },
  Bm: {
    3: '1-rIc_YA6SiyKcD4O5ucvl5Zsn3MP-zjs',
    2: '1hoAX4Uw4o-sXGhUNuiJBcHo33kXT_AJP',
    1: '1wWKhJnXhPuqhfesMELl1RY9U_2iRZD2m'
  },
  A: {
    5: '1XIS4JdT_PhGXvxSbkADhIceWUX4waWn1',
    4: '1zJ0NspaGTxasikNFW22vE2stK-Vri4vA',
    3: '1uQAY7JDk8rCh3Y6TVhbHCboCDxA2GVLv',
    2: '18PjH-CN2gptqdOgWnJ-MSdRqy9r1xHn8',
    1: '1cbFb2hPNtHJ9XzEUgYYqOjwI73isVOR0'
  },
  G: {
    6: '1Dv1mTplfORNK3jKwtKWFCxuNc31xYSUr',
    5: '1BWrZJBE25J_FifCtc3ApEByxOzyY8Jp_',
    4: '13zBfApra6bmctqd-ybqmjljuMrbtEW9I',
    3: '1fd2X__QVeWcHjNrGLbo3QVVI1YmGn0F_',
    2: '1JyVOTOcINvcOSEm0AL6WpJj2UKaLVW-B',
    1: '17M1un5V662gnyKCgT6dZi6C1l4KqhOO0'
  },
  E: {
    6: '17k0VGQVaQjrDdShFSe5kYZB2ENjJ6AJX',
    5: '1Li-ElHWlBSlG4ZQDOpLcFfz769Wk4EIl',
    4: '133liFw7sN_MyEw98xs2fR-NpdSojn51k',
    3: '1iTOO3Flw27mTfOWI9oLATzT_K_ubHgWT',
    2: '1RfE9dfh0t9lbZm1pyvm22gQQlspJjpNR',
    1: '1Ufkehj-6YxEqe9yTVLE8aLxeFElWWf8u'
  },
  Dm: {
    4: '1-VDYsxpXN6pOVWILXXONLG9j-KbCf04_',
    3: '1P8vLoVI4cJXnmCJWC_H7ZzSPDlMervhZ',
    2: '1n3FV8BRxyYuFrLoHG4rToHZhHSZUreMj',
    1: '1jXpf7N13tvetVq1XxiA-ZeNer1_JUbUk'
  }
};

// Download all chord sounds
async function downloadAllSounds() {
  for (const [chord, strings] of Object.entries(chordSounds)) {
    console.log(`Downloading ${chord} chord sounds...`);
    
    for (const [string, fileId] of Object.entries(strings)) {
      const outputPath = join(soundsDir, `${chord}_${string}.wav`);
      console.log(`Downloading string ${string} to ${outputPath}`);
      
      try {
        await downloadFile(fileId, outputPath);
        console.log(`Successfully downloaded ${chord} string ${string}`);
      } catch (error) {
        console.error(`Error downloading ${chord} string ${string}:`, error);
      }
    }
  }
  
  console.log('All downloads completed!');
}

// Start the download process
downloadAllSounds();