/**
 * Image service for managing uploaded images
 * For MVP, uses localStorage with base64 encoding. In production, will use cloud storage (Cloudinary, S3, etc.)
 */

export interface ImageAsset {
  id: string;
  name: string;
  url: string; // Base64 data URL or external URL
  alt: string;
  uploadedAt: string;
  uploadedBy: string;
  size?: number;
  type?: string;
}

const IMAGES_STORAGE_KEY = "orca_images";

/**
 * Get all images
 */
export function getAllImages(): ImageAsset[] {
  try {
    const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading images:", error);
  }
  return [];
}

/**
 * Save an image
 */
export function saveImage(image: ImageAsset): { success: boolean; error?: string } {
  try {
    const images = getAllImages();
    const existingIndex = images.findIndex(img => img.id === image.id);
    
    if (existingIndex >= 0) {
      images[existingIndex] = image;
    } else {
      images.push(image);
    }
    
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(images));
    
    // In production, this would upload to cloud storage
    // await fetch('/api/images/upload', { method: 'POST', body: formData });
    
    return { success: true };
  } catch (error) {
    console.error("Error saving image:", error);
    return { success: false, error: "Failed to save image" };
  }
}

/**
 * Delete an image
 */
export function deleteImage(imageId: string): { success: boolean; error?: string } {
  try {
    const images = getAllImages();
    const filtered = images.filter(img => img.id !== imageId);
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(filtered));
    
    // In production, this would delete from cloud storage
    // await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: "Failed to delete image" };
  }
}

/**
 * Convert file to base64 data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image file
 */
export async function uploadImage(
  file: File,
  alt: string = "",
  uploadedBy: string = "admin"
): Promise<{ success: boolean; image?: ImageAsset; error?: string }> {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" };
    }

    // Validate file size (max 5MB for base64)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "Image size must be less than 5MB" };
    }

    const dataURL = await fileToDataURL(file);
    
    const image: ImageAsset = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      url: dataURL,
      alt: alt || file.name,
      uploadedAt: new Date().toISOString(),
      uploadedBy,
      size: file.size,
      type: file.type
    };

    const result = saveImage(image);
    if (result.success) {
      return { success: true, image };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

/**
 * Get image by ID
 */
export function getImageById(imageId: string): ImageAsset | null {
  const images = getAllImages();
  return images.find(img => img.id === imageId) || null;
}
