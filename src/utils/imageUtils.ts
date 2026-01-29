export const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '/placeholder-image.svg';
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it starts with /uploads or /images, prepend the backend URL
  if (imageUrl.startsWith('/uploads') || imageUrl.startsWith('/images')) {
    return `https://dessertshopbackend.onrender.com${imageUrl}`;
  }
  
  // Default fallback
  return '/placeholder-image.svg';
};