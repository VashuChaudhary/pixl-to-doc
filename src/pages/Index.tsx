import { PdfToImages } from '@/components/PdfToImages';
import { ImagesToPdf } from '@/components/ImagesToPdf';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Github, FileType, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/pdf-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  PDF & Image
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                    Converter
                  </span>
                </h1>
                <p className="text-lg text-purple-100 max-w-lg">
                  Transform your documents instantly. Convert PDFs to images or combine multiple images into a single PDF - all processed securely in your browser.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="lg" className="shadow-glow">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <Github className="mr-2 h-5 w-5" />
                  View Source
                </Button>
              </div>

              <div className="flex items-center gap-8 text-purple-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">100% Client-Side</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">No Upload Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Privacy First</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="PDF Converter Hero" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Conversion Tool
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select the tool you need to transform your documents. All processing happens locally in your browser for maximum security and privacy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="pdf-to-images" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-gradient-secondary">
                <TabsTrigger 
                  value="pdf-to-images" 
                  className="flex items-center gap-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <FileType className="h-5 w-5" />
                  PDF to Images
                </TabsTrigger>
                <TabsTrigger 
                  value="images-to-pdf"
                  className="flex items-center gap-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <FileType className="h-5 w-5" />
                  Images to PDF
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pdf-to-images" className="mt-0">
                <PdfToImages />
              </TabsContent>
              
              <TabsContent value="images-to-pdf" className="mt-0">
                <ImagesToPdf />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Why Choose Our Converter?</h3>
            <p className="text-muted-foreground">Built with modern web technologies for the best user experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
              </div>
              <h4 className="text-lg font-semibold">Privacy First</h4>
              <p className="text-muted-foreground text-sm">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
              </div>
              <h4 className="text-lg font-semibold">Lightning Fast</h4>
              <p className="text-muted-foreground text-sm">
                No server uploads or queues. Convert your files instantly.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
              </div>
              <h4 className="text-lg font-semibold">High Quality</h4>
              <p className="text-muted-foreground text-sm">
                Advanced algorithms ensure your converted files maintain their quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;