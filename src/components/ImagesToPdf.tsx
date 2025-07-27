import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileDropZone } from './FileDropZone';
import { Progress } from '@/components/ui/progress';
import { Download, FileText, Loader2, ArrowUp, ArrowDown, X } from 'lucide-react';
import { processImagesToPdf } from '@/lib/pdfProcessor';
import { useToast } from '@/hooks/use-toast';

interface ImageFile {
  file: File;
  preview: string;
}

export function ImagesToPdf() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (files: File[]) => {
    const newImages: ImageFile[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImageFiles(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === imageFiles.length - 1)) {
      return;
    }

    setImageFiles(prev => {
      const newFiles = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      return newFiles;
    });
  };

  const generatePdf = async () => {
    if (imageFiles.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const pdfBlob = await processImagesToPdf(imageFiles.map(img => img.file), (progress) => {
        setProgress(progress);
      });

      // Download the PDF
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "PDF generated and downloaded successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Images to PDF
        </CardTitle>
        <CardDescription>
          Upload multiple images to create a single PDF document
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileDropZone
          onFilesSelected={handleImageUpload}
          acceptedTypes={{
            'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif']
          }}
          multiple={true}
          maxSize={50 * 1024 * 1024}
        />

        {processing && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Generating PDF...</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {imageFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                Images ({imageFiles.length})
              </h4>
              <Button 
                onClick={generatePdf} 
                disabled={processing}
                className="bg-gradient-primary"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
            
            <div className="space-y-3">
              {imageFiles.map((imageFile, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                  <img
                    src={imageFile.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{imageFile.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(imageFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveImage(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveImage(index, 'down')}
                      disabled={index === imageFiles.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
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