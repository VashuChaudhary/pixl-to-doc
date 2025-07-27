import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileDropZone } from './FileDropZone';
import { Progress } from '@/components/ui/progress';
import { Download, Image, Loader2 } from 'lucide-react';
import { processPdfToImages } from '@/lib/pdfProcessor';
import { downloadAsZip } from '@/lib/downloadUtils';
import { useToast } from '@/hooks/use-toast';

export function PdfToImages() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedImages, setExtractedImages] = useState<{ blob: Blob; name: string }[]>([]);
  const { toast } = useToast();

  const handlePdfUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    const pdfFile = files[0];
    setProcessing(true);
    setProgress(0);
    setExtractedImages([]);

    try {
      const images = await processPdfToImages(pdfFile, (progress) => {
        setProgress(progress);
      });
      
      setExtractedImages(images);
      toast({
        title: "Success!",
        description: `Extracted ${images.length} images from PDF`,
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "Error",
        description: "Failed to process PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const downloadSingle = (image: { blob: Blob; name: string }) => {
    const url = URL.createObjectURL(image.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    try {
      await downloadAsZip(extractedImages, 'pdf-images.zip');
      toast({
        title: "Download Started",
        description: "All images are being downloaded as a ZIP file",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to create ZIP file",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          PDF to Images
        </CardTitle>
        <CardDescription>
          Upload a PDF file to extract all images from it
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileDropZone
          onFilesSelected={handlePdfUpload}
          acceptedTypes={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          maxSize={50 * 1024 * 1024}
        />

        {processing && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Processing PDF...</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {extractedImages.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                Extracted Images ({extractedImages.length})
              </h4>
              <Button onClick={downloadAll} className="bg-gradient-primary">
                <Download className="h-4 w-4 mr-2" />
                Download All (ZIP)
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {extractedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image.blob)}
                    alt={`Extracted image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => downloadSingle(image)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}