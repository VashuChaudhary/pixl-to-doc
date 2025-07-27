import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker for Vite environment
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface ExtractedImage {
  blob: Blob;
  name: string;
}

export async function processPdfToImages(
  pdfFile: File,
  onProgress?: (progress: number) => void
): Promise<ExtractedImage[]> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: ExtractedImage[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });

    images.push({
      blob,
      name: `page-${pageNum}.png`
    });

    if (onProgress) {
      onProgress((pageNum / pdf.numPages) * 100);
    }
  }

  return images;
}

export async function processImagesToPdf(
  imageFiles: File[],
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const arrayBuffer = await file.arrayBuffer();
    
    let image;
    if (file.type.includes('png')) {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      image = await pdfDoc.embedJpg(arrayBuffer);
    }

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    
    // Calculate dimensions to fit image while maintaining aspect ratio
    const imgWidth = image.width;
    const imgHeight = image.height;
    const ratio = Math.min(width / imgWidth, height / imgHeight);
    
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    
    // Center the image on the page
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });

    if (onProgress) {
      onProgress(((i + 1) / imageFiles.length) * 100);
    }
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}