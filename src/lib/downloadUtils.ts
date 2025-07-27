import JSZip from 'jszip';

export interface DownloadableFile {
  blob: Blob;
  name: string;
}

export async function downloadAsZip(files: DownloadableFile[], zipName: string): Promise<void> {
  const zip = new JSZip();

  // Add each file to the zip
  files.forEach((file, index) => {
    zip.file(file.name || `file-${index + 1}`, file.blob);
  });

  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  // Download the zip file
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}