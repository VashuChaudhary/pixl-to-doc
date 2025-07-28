# PdfImg

PdfImg is a modern web application that allows users to seamlessly convert images to PDF and extract images from PDF files. Built with React, TypeScript, Vite, and Tailwind CSS, it provides a fast, intuitive, and mobile-friendly user experience for managing image and PDF conversions directly in the browser.

---

## Features

- **Image to PDF Conversion**: Upload multiple images and convert them into a single PDF document.
- **PDF to Images Extraction**: Extract all images from a PDF file and download them individually or as a batch.
- **Drag & Drop File Upload**: Effortlessly add files using drag-and-drop or file picker.
- **Mobile Responsive**: Optimized for both desktop and mobile devices.
- **Modern UI**: Clean, accessible, and customizable interface using Tailwind CSS and reusable UI components.
- **Fast & Secure**: All processing is done client-side—no files are uploaded to any server.

---

## Demo

> _Add a link or screenshot here if you have a live demo or preview._

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Bun](https://bun.sh/) (if using Bun for package management)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/VashuChaudhary/pixl-to-doc.git
   cd pixl-to-doc
   ```

2. **Install dependencies:**

   ```sh
   # Using npm
   npm install
   # or
   yarn install
   # or, if using Bun
   bun install
   ```

3. **Start the development server:**

   ```sh
   # Using npm
   npm run dev
   # or
   yarn dev
   # or, if using Bun
   bun run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal).

---

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable React components
│   │   └── ui/            # UI primitives (buttons, dialogs, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility and processing functions
│   ├── pages/             # Page-level components
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── index.html             # HTML template
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```

---

## Usage

1. **Convert Images to PDF:**

   - Go to the "Images to PDF" section.
   - Drag and drop images or use the file picker.
   - Arrange images as needed and click "Convert".
   - Download the generated PDF.

2. **Extract Images from PDF:**
   - Go to the "PDF to Images" section.
   - Upload a PDF file.
   - Preview and download extracted images.

---

## Technologies Used

- **React** (with TypeScript)
- **Vite** (for fast development and build)
- **Tailwind CSS** (for styling)
- **Custom UI Components** (accordion, dialog, toast, etc.)
- **Client-side PDF/Image Processing**

---

## Customization

- **UI Components**: Located in `src/components/ui/` for easy reuse and extension.
- **Hooks**: Custom hooks (e.g., `useIsMobile`) in `src/hooks/` for responsive logic and more.
- **Utils**: Utility functions for file handling and PDF/image processing in `src/lib/`.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pdf-lib](https://pdf-lib.js.org/) or any other libraries used for PDF/image processing

---

## Contact

For questions, suggestions, or support, please open an issue or contact the maintainer via [GitHub](https://github.com/VashuChaudhary/pixl-to-doc).

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.
