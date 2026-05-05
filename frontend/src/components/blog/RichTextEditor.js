import React, { useRef, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import toast from 'react-hot-toast';

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState('https://');
  const [imageSize, setImageSize] = useState('medium');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSize, setVideoSize] = useState('large');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [linkUrl, setLinkUrl] = useState('https://');

  const getQuillInstance = useCallback(() => {
    if (quillRef.current) {
      return quillRef.current.getEditor();
    }
    return null;
  }, []);

  const handleAddLink = () => {
    setIsLinkDialogOpen(false);
    if (linkUrl && (linkUrl.startsWith('http://') || linkUrl.startsWith('https://'))) {
      const quill = getQuillInstance();
      if (quill) {
        const range = quill.getSelection(true);
        if (range) {
          if (range.length > 0) {
            quill.formatText(range.index, range.length, 'link', linkUrl);
          } else {
            quill.insertText(range.index, linkUrl, 'link', linkUrl);
            quill.setSelection(range.index + linkUrl.length);
          }
          toast.success('Tautan berhasil ditambahkan!');
        } else {
          const length = quill.getLength();
          quill.insertText(length, linkUrl, 'link', linkUrl);
          toast.success('Tautan berhasil ditambahkan!');
        }
      }
    } else {
      toast.error('Harap masukkan URL yang valid diawali dengan http:// atau https://.');
    }
    setLinkUrl('https://');
  };

  const handleAddImage = () => {
    setIsImageDialogOpen(false);
    if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('data:') || imageUrl.startsWith('/'))) {
      const quill = getQuillInstance();
      if (quill) {
        const range = quill.getSelection(true);
        const index = range ? range.index : quill.getLength();
        
        // Determine image dimensions based on selected size
        const sizeConfig = {
          small: { width: '300', height: 'auto' },
          medium: { width: '600', height: 'auto' },
          large: { width: '900', height: 'auto' },
          full: { width: '100%', height: 'auto' },
          custom: { width: 'auto', height: 'auto' }
        };
        
        const dimensions = sizeConfig[imageSize] || sizeConfig.medium;
        const styleAttr = `max-width: ${dimensions.width}; width: ${dimensions.width}; height: ${dimensions.height};`;
        const imageHtml = `<img src="${imageUrl}" alt="Image" style="${styleAttr}" />`;
        
        quill.clipboard.dangerouslyPasteHTML(index, imageHtml);
        quill.setSelection(index + 1);
        toast.success('Gambar berhasil ditambahkan!');
      }
    } else {
      toast.error('Harap masukkan URL gambar yang valid.');
    }
    setImageUrl('https://');
    setImageSize('medium');
  };

  const handleAddVideo = () => {
    setIsVideoDialogOpen(false);
    if (videoUrl) {
      let embedUrl = videoUrl;
      if (videoUrl.includes('youtube.com/watch?v=')) {
        embedUrl = videoUrl.replace('watch?v=', 'embed/');
      } else if (videoUrl.includes('youtu.be/')) {
        embedUrl = videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
      } else if (videoUrl.includes('vimeo.com/')) {
        const videoId = videoUrl.split('vimeo.com/')[1]?.split('/')[0];
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      }

      const quill = getQuillInstance();
      if (quill) {
        const range = quill.getSelection(true);
        const index = range ? range.index : quill.getLength();
        
        // Determine video dimensions based on selected size
        const sizeConfig = {
          small: { width: '480', height: '270' },
          medium: { width: '640', height: '360' },
          large: { width: '854', height: '480' },
          full: { width: '100%', height: 'auto' }
        };
        
        const dimensions = sizeConfig[videoSize] || sizeConfig.large;
        const styleAttr = `width: ${dimensions.width}; height: ${dimensions.height}; max-width: 100%;`;
        
        quill.insertEmbed(index, 'video', embedUrl);
        
        // Apply size to the video iframe
        setTimeout(() => {
          const editor = quill.root;
          const iframes = editor.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
          iframes.forEach(iframe => {
            iframe.style.cssText = styleAttr;
          });
        }, 100);
        
        quill.setSelection(index + 1);
        toast.success('Video berhasil ditambahkan!');
      }
    } else {
      toast.error('Harap masukkan URL video.');
    }
    setVideoUrl('');
    setVideoSize('large');
  };

  const handleAddTable = () => {
    setIsTableDialogOpen(false);
    let tableHtml = '<table style="width:100%; border-collapse: collapse;">';
    tableHtml += '<thead><tr>';
    for (let i = 0; i < tableCols; i++) {
      tableHtml += `<th style="border: 1px solid #ccc; padding: 8px; background: #f5f5f5;">Header ${i + 1}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let i = 0; i < tableRows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < tableCols; j++) {
        tableHtml += `<td style="border: 1px solid #ccc; padding: 8px;">Cell ${i + 1},${j + 1}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p><br/></p>';
    
    const quill = getQuillInstance();
    if (quill) {
      const range = quill.getSelection(true);
      const index = range ? range.index : quill.getLength();
      quill.clipboard.dangerouslyPasteHTML(index, tableHtml);
      toast.success('Tabel berhasil ditambahkan!');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'align',
    'color', 'background', 'script',
  ];

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1A1A1A] focus-within:ring-2 focus-within:ring-blue-500">
      {/* Additional Custom Toolbar Buttons */}
      <div className="custom-toolbar-buttons">
        <span className="ql-formats">
          <button onClick={() => setIsLinkDialogOpen(true)} title="Insert Link" className="custom-btn">
            <svg viewBox="0 0 18 18" style={{ width: '18px', height: '18px' }}>
              <path className="ql-stroke" d="M5.76,12.24 L4.34,10.83 C3.56,10.05 3.56,8.79 4.34,8.01 L7.17,5.17 C7.95,4.39 9.21,4.39 9.99,5.17 L11.41,6.59" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path className="ql-stroke" d="M12.24,5.76 L13.66,7.17 C14.44,7.95 14.44,9.21 13.66,9.99 L10.83,12.83 C10.05,13.61 8.79,13.61 8.01,12.83 L6.59,11.41" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button onClick={() => setIsImageDialogOpen(true)} title="Insert Image" className="custom-btn">
            <svg viewBox="0 0 18 18" style={{ width: '18px', height: '18px' }}>
              <rect x="2" y="2" width="14" height="14" rx="2" className="ql-stroke" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="6" cy="6" r="2" className="ql-stroke" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2,14 L6,10 L9,13 L12,9 L16,13" className="ql-stroke" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button onClick={() => setIsVideoDialogOpen(true)} title="Insert Video" className="custom-btn">
            <svg viewBox="0 0 18 18" style={{ width: '18px', height: '18px' }}>
              <rect x="2" y="3" width="14" height="12" rx="2" className="ql-stroke" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <polygon points="7,7 12,9 7,11" className="ql-fill" fill="currentColor"/>
            </svg>
          </button>
          <button onClick={() => setIsTableDialogOpen(true)} title="Insert Table" className="custom-btn">
            <svg viewBox="0 0 18 18" style={{ width: '18px', height: '18px' }}>
              <rect className="ql-stroke" x="2" y="2" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <line className="ql-stroke" x1="2" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5"/>
              <line className="ql-stroke" x1="2" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5"/>
              <line className="ql-stroke" x1="6" y1="2" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5"/>
              <line className="ql-stroke" x1="10" y1="2" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </span>
      </div>

      {/* Quill Editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Mulai tulis konten blog Anda di sini..."
        className="quill-custom-editor"
      />

      {/* Custom Styles */}
      <style>{`
        .custom-toolbar-buttons {
          background: #1f2937;
          border: 1px solid #374151;
          border-bottom: none;
          padding: 8px;
          display: flex;
          gap: 4px;
        }

        .custom-toolbar-buttons .ql-formats {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
        }

        .custom-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .custom-btn:hover {
          background: #374151;
          color: #fff;
        }

        .quill-custom-editor .ql-toolbar {
          background: #1f2937;
          border: 1px solid #374151;
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
          padding: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }

        .quill-custom-editor .ql-toolbar .ql-formats {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .quill-custom-editor .ql-toolbar button,
        .quill-custom-editor .ql-toolbar select {
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .quill-custom-editor .ql-toolbar button:hover,
        .quill-custom-editor .ql-toolbar select:hover {
          background: #374151;
          color: #fff;
        }

        .quill-custom-editor .ql-toolbar button.ql-active {
          background: #3b82f6;
          color: #fff;
        }

        .quill-custom-editor .ql-toolbar select {
          background: #111827;
          border: 1px solid #374151;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 13px;
          min-width: 60px;
        }

        .quill-custom-editor .ql-toolbar select:hover {
          border-color: #4b5563;
        }

        .quill-custom-editor .ql-container {
          border: 1px solid #374151;
          border-radius: 0 0 0.5rem 0.5rem;
          background: #1A1A1A;
          font-size: 16px;
        }

        .quill-custom-editor .ql-editor {
          min-height: 400px;
          color: #d1d5db;
          font-family: inherit;
          line-height: 1.7;
          cursor: text;
        }

        .quill-custom-editor .ql-editor:focus {
          outline: none;
        }

        .quill-custom-editor .ql-container:focus {
          outline: none;
        }

        .quill-custom-editor .ql-editor.ql-blank::before {
          color: #6b7280;
          font-style: normal;
        }

        .quill-custom-editor .ql-editor h1,
        .quill-custom-editor .ql-editor h2,
        .quill-custom-editor .ql-editor h3,
        .quill-custom-editor .ql-editor h4,
        .quill-custom-editor .ql-editor h5,
        .quill-custom-editor .ql-editor h6 {
          color: #fff;
          margin: 1em 0 0.5em 0;
        }

        .quill-custom-editor .ql-editor h1 { font-size: 2em; font-weight: bold; }
        .quill-custom-editor .ql-editor h2 { font-size: 1.5em; font-weight: bold; }
        .quill-custom-editor .ql-editor h3 { font-size: 1.25em; font-weight: bold; }

        .quill-custom-editor .ql-editor p {
          margin-bottom: 1em;
        }

        .quill-custom-editor .ql-editor blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 16px;
          margin-left: 0;
          font-style: italic;
          color: #9ca3af;
        }

        .quill-custom-editor .ql-editor pre.ql-syntax {
          background-color: #111827;
          border: 1px solid #374151;
          border-radius: 6px;
          padding: 16px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          color: #10b981;
        }

        .quill-custom-editor .ql-editor code {
          background-color: #111827;
          border-radius: 3px;
          padding: 2px 6px;
          font-family: 'Courier New', monospace;
          color: #10b981;
          font-size: 0.9em;
        }

        .quill-custom-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
          display: block;
        }

        .quill-custom-editor .ql-editor iframe,
        .quill-custom-editor .ql-editor video {
          max-width: 100%;
          border-radius: 8px;
          margin: 1em 0;
          display: block;
        }

        .quill-custom-editor .ql-editor table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }

        .quill-custom-editor .ql-editor table td,
        .quill-custom-editor .ql-editor table th {
          border: 1px solid #374151;
          padding: 10px;
          text-align: left;
        }

        .quill-custom-editor .ql-editor table th {
          background-color: #374151;
          font-weight: bold;
          color: #fff;
        }

        .quill-custom-editor .ql-editor table tr:nth-child(even) {
          background-color: #1f2937;
        }

        .quill-custom-editor .ql-editor ul,
        .quill-custom-editor .ql-editor ol {
          padding-left: 2em;
          margin-bottom: 1em;
        }

        .quill-custom-editor .ql-editor li {
          margin-bottom: 0.5em;
        }
      `}</style>

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Masukkan URL Tautan</DialogTitle></DialogHeader>
          <div className="py-4">
            <Input 
              id="link-url" 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)} 
              className="bg-slate-800 border-slate-600"
              placeholder="https://example.com"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>Batal</Button>
            <Button onClick={handleAddLink}>Tambah Tautan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Masukkan URL Gambar</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="image-url">URL Gambar</Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-slate-800 border-slate-600 mt-2"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-size">Ukuran Gambar</Label>
              <select
                id="image-size"
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-sm text-white mt-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="small">Kecil (300px)</option>
                <option value="medium">Sedang (600px)</option>
                <option value="large">Besar (900px)</option>
                <option value="full">Penuh (100%)</option>
              </select>
            </div>
            {imageUrl && (
              <div className="mt-3">
                <Label>Preview</Label>
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-600 bg-slate-800 flex items-center justify-center">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="max-w-full max-h-40 object-contain"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsImageDialogOpen(false); setImageUrl('https://'); setImageSize('medium'); }}>Batal</Button>
            <Button onClick={handleAddImage}>Tambah Gambar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Masukkan URL Video (YouTube/Vimeo)</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="video-url">URL Video</Label>
              <Input
                id="video-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="bg-slate-800 border-slate-600 mt-2"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div>
              <Label htmlFor="video-size">Ukuran Video</Label>
              <select
                id="video-size"
                value={videoSize}
                onChange={(e) => setVideoSize(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-sm text-white mt-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="small">Kecil (480x270)</option>
                <option value="medium">Sedang (640x360)</option>
                <option value="large">Besar (854x480)</option>
                <option value="full">Penuh (100%)</option>
              </select>
            </div>
            <div className="text-xs text-slate-400">
              <p>💡 Tip: Gunakan URL embed YouTube atau Vimeo</p>
              <p>Contoh: https://youtube.com/embed/VIDEO_ID</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsVideoDialogOpen(false); setVideoUrl(''); setVideoSize('large'); }}>Batal</Button>
            <Button onClick={handleAddVideo}>Tambah Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table Dialog */}
      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
          <DialogHeader><DialogTitle>Buat Tabel</DialogTitle></DialogHeader>
          <div className="py-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="table-rows">Baris</Label>
              <Input 
                id="table-rows" 
                type="number" 
                value={tableRows} 
                onChange={(e) => setTableRows(parseInt(e.target.value, 10))} 
                className="bg-slate-800 border-slate-600" 
                min="1" 
                max="20" 
              />
            </div>
            <div>
              <Label htmlFor="table-cols">Kolom</Label>
              <Input 
                id="table-cols" 
                type="number" 
                value={tableCols} 
                onChange={(e) => setTableCols(parseInt(e.target.value, 10))} 
                className="bg-slate-800 border-slate-600" 
                min="1" 
                max="10" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTableDialogOpen(false)}>Batal</Button>
            <Button onClick={handleAddTable}>Buat Tabel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;
