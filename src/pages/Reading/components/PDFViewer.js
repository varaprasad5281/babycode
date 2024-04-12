import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
// import pdfFile from "./IELTS+READING+TEST+152 (1).pdf";

function PDFViewer({ src }) {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setClientWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculatedWidth = Math.min(clientWidth / 1.3, 800);

  return (
    <div className="bg-white px-3 py-5 mt-3 flex justify-center">
      <Document
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        className="h-[75vh] overflow-scroll"
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <div className="flex flex-col gap-1 mb-5 border p-2 sm:p-3">
                <p className="text-defaultGray text-sm">
                  Page {page} of {numPages}
                </p>
                <Page
                  //   height='500'
                  width={calculatedWidth}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            );
          })}
      </Document>
    </div>
  );
}

export default PDFViewer;
