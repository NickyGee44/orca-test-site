import { useState, useEffect, useRef } from "react";
import { getAllImages, uploadImage, deleteImage, type ImageAsset } from "../../services/imageService";

export function ImageManager() {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const allImages = getAllImages();
    setImages(allImages);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    const result = await uploadImage(file, file.name.split(".")[0], "admin");

    if (result.success && result.image) {
      setUploadMessage({ type: "success", text: `Image "${result.image.name}" uploaded successfully!` });
      loadImages();
      setTimeout(() => setUploadMessage(null), 3000);
    } else {
      setUploadMessage({ type: "error", text: result.error || "Failed to upload image" });
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (imageId: string, imageName: string) => {
    if (!confirm(`Are you sure you want to delete "${imageName}"?`)) return;

    const result = deleteImage(imageId);
    if (result.success) {
      loadImages();
    } else {
      alert(result.error || "Failed to delete image");
    }
  };

  const copyImageUrl = (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (image) {
      navigator.clipboard.writeText(image.url);
      alert("Image URL copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Image Manager</h1>
          <p className="mt-2 text-sm text-slate-400">Upload and manage images for your website</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="inline-flex cursor-pointer items-center gap-2 rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
          >
            {isUploading ? "Uploading..." : "📷 Upload Image"}
          </label>
        </div>
      </div>

      {uploadMessage && (
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            uploadMessage.type === "success"
              ? "bg-green-500/10 text-green-300 border border-green-500/30"
              : "bg-red-500/10 text-red-300 border border-red-500/30"
          }`}
        >
          {uploadMessage.text}
        </div>
      )}

      {images.length === 0 ? (
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-12 text-center shadow-orca-depth-2">
          <p className="text-slate-400">No images uploaded yet. Upload your first image to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 overflow-hidden shadow-orca-depth-2"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 truncate text-sm font-medium text-slate-50">{image.name}</h3>
                <p className="mb-2 text-xs text-slate-400">{image.alt}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyImageUrl(image.id)}
                    className="flex-1 rounded-md border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(image.id, image.name)}
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs text-red-300 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-2 text-[10px] text-slate-500">
                  {image.size ? `${(image.size / 1024).toFixed(1)} KB` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
