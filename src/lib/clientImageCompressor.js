/**
 * ============================================================================
 * JORNAL ARCANJO — COMPRESSOR DE IMAGENS CLIENT-SIDE (BROWSER CANVAS)
 * ============================================================================
 * Reduz e otimiza imagens no navegador antes do upload para o Supabase Storage.
 * Transforma fotos pesadas de celulares (5MB-15MB) em arquivos WebP/JPEG leves
 * (~80KB-140KB), economizando banda, storage e garantindo uploads ultrarrápidos
 * para a equipe da redação.
 *
 * @module src/lib/clientImageCompressor
 * @param {File} file - Arquivo de imagem original selecionado no input
 * @param {Object} [options] - Parâmetros opcionais de compressão
 * @param {number} [options.maxWidth=1280] - Largura máxima em pixels
 * @param {number} [options.maxHeight=1280] - Altura máxima em pixels
 * @param {number} [options.quality=0.82] - Fator de qualidade visual (0.0 a 1.0)
 * @returns {Promise<{ blob: Blob, fileName: string, mimeType: string }>}
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
