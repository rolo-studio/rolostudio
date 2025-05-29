
import { useState, useEffect } from 'react';

export const useLikes = () => {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load liked products from localStorage on mount
    const saved = localStorage.getItem('likedProducts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLikedProducts(new Set(parsed));
      } catch (error) {
        console.error('Error parsing liked products:', error);
      }
    }
  }, []);

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(productId)) {
        newLikes.delete(productId);
      } else {
        newLikes.add(productId);
      }
      
      // Save to localStorage
      localStorage.setItem('likedProducts', JSON.stringify(Array.from(newLikes)));
      
      return newLikes;
    });
  };

  const isLiked = (productId: string) => likedProducts.has(productId);

  const getLikedProductsArray = () => Array.from(likedProducts);

  return {
    toggleLike,
    isLiked,
    likedProducts: getLikedProductsArray(),
    likedCount: likedProducts.size
  };
};
