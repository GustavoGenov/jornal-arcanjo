/**
 * Compresses and resizes an image file in the browser before upload.
 * Reduces 5MB-10MB camera/phone photos to ~80KB-120KB WebP/JPEG,
 * protecting Supabase storage and drastically speeding up uploads.
 *
 * @param {File} file - Original file from <input type="file">
 * @param {Object} options - Configuration options
 * @param {number} options.maxWidth - Maximum width in pixels (default 1280)
 * @param {number} options.maxHeight - Maximum height in pixels (default 1280)
 * @param {number} options.quality - Compression quality 0.0 to 1.0 (default 0.82)
 * @returns {Promise<{ file: Blob, fileName: string, mimeType: string }>}
 */
export async function compressImageForUpload(file, options = {}) {
  const {
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.82
  } = options;

  // If not an image or running on server, return original
  if (!file || !file.type.startsWith('image/')) {
    return { file, fileName: file?.name || 'image.jpg', mimeType: file?.type || 'image/jpeg' };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Smooth image downscaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        const hasWebp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        const mimeType = hasWebp ? 'image/webp' : 'image/jpeg';
        const ext = hasWebp ? 'webp' : 'jpg';

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              // Fallback to original file if blob conversion fails
              resolve({ file, fileName: file.name, mimeType: file.type });
              return;
            }
            const cleanBaseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
            resolve({ blob, fileName, mimeType });
          },
          mimeType,
          quality
        );
      };
      img.onerror = () => reject(new Error('Falha ao processar a imagem.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de imagem.'));
    reader.readAsDataURL(file);
  });
}
