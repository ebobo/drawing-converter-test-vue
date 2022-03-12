/**
 * Read bytes from .dwg file
 */

export async function getAsByteArray(file: File) {
  return new Uint16Array(await readFile(file));
}

function readFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader();

    // Register event listeners
    reader.addEventListener('loadend', (e) => resolve(e.target?.result));
    reader.addEventListener('error', reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}
