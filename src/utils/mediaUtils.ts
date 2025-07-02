// Utility function to get video URL for a product
export const getVideoUrl = (sku: string): string | null => {
  // Convert SKU to lowercase and handle different formats
  const normalizedSku = sku.toLowerCase().replace(':', '');
  
  // Handle special cases for SKU naming
  let videoFileName = normalizedSku;
  
  // Special case for NO:03A -> no03_1
  if (normalizedSku === 'no03a') {
    videoFileName = 'no03_1';
  }
  
  // Check if video exists (we'll assume it exists based on the file list)
  const videoPath = `/videos/${videoFileName}.mp4`;
  
  // List of available videos based on the uploaded files
  const availableVideos = [
    'no01', 'no02', 'no03', 'no03_1', 'no04', 'no05', 'no05a', 'no07', 'no07a',
    'no08', 'no09', 'no10', 'no10a', 'no11', 'no12', 'no13', 'no14', 'no15',
    'no16', 'no17', 'no18', 'no19', 'no20', 'no21', 'no22', 'no23', 'no122',
    'no177', 'no277', 'no377', 'no477', 'v01', 'v02', 'v03', 'v04', 'v05',
    'v06', 'v07', 'v08', 'v09', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15',
    'v16', 'v17', 'v18', 'v19', 'v20'
  ];
  
  if (availableVideos.includes(videoFileName)) {
    return videoPath;
  }
  
  return null;
};

// Utility function to get all image URLs for a product
export const getProductImages = (sku: string): string[] => {
  const normalizedSku = sku.toLowerCase().replace(':', '');
  const images: string[] = [];
  
  // Handle special cases for SKU naming
  let baseFileName = normalizedSku;
  
  // Special case for NO:03A
  if (normalizedSku === 'no03a') {
    baseFileName = 'no03a';
  }
  
  // Define available images based on the uploaded files
  const imageMap: Record<string, string[]> = {
    'no01': ['no01.jpeg', 'no01_1.jpeg', 'no01_2.jpeg'],
    'no02': ['no02.jpeg', 'no02_1.jpeg'],
    'no03': ['no03.png', 'no03_1.jpeg'],
    'no03a': ['no03a.jpeg', 'no03a_1.jpeg'],
    'no04': ['no04.jpeg', 'no04_1.jpeg'],
    'no05': ['no05.jpeg', 'no05_1.jpeg'],
    'no05a': ['no05a.jpeg', 'no05a_1.jpeg'],
    'no07': ['no07.png', 'no07_1.png'],
    'no07a': ['no07a.jpeg', 'no07a_1.jpeg'],
    'no08': ['no08.jpeg', 'no08_1.jpeg'],
    'no09': ['no09.jpeg', 'no09_1.jpeg'],
    'no10': ['no10.jpeg', 'no10_1.jpeg'],
    'no10a': ['no10a.jpeg', 'no10a_1.jpeg'],
    'no11': ['no11.jpeg', 'no11_1.jpeg'],
    'no12': ['no12.jpeg', 'no12_1.jpeg'],
    'no122': ['no122.jpeg'],
    'no13': ['no13.jpeg', 'no13_1.jpeg'],
    'no14': ['no14.png', 'no14_1.jpeg'],
    'no15': ['no15.jpeg', 'no15_1.jpeg'],
    'no16': ['no16.jpeg', 'no16_1.jpeg'],
    'no17': ['no17.jpeg', 'no17_1.jpeg'],
    'no177': ['no177.jpeg', 'no177_1.jpeg'],
    'no18': ['no18.jpeg', 'no18_1.jpeg'],
    'no19': ['no19.png', 'no19_1.jpeg'],
    'no20': ['no20.png', 'no20_1.png'],
    'no21': ['no21.jpeg', 'no21_1.jpeg'],
    'no22': ['no22.png', 'no22_1.jpeg'],
    'no23': ['no23.png', 'no23_1.png'],
    'no24': ['no24.jpeg'],
    'no25': ['no25.jpeg'],
    'no277': ['no277.jpeg'],
    'no377': ['no377.jpeg', 'no377_1.jpeg'],
    'no477': ['no477.jpeg', 'no477_1.jpeg'],
    'no50': ['no50.jpeg'],
    'v01': ['v01.jpeg'],
    'v02': ['v02.jpeg'],
    'v03': ['v03.jpeg', 'v03_1.jpeg'],
    'v04': ['v04.jpeg', 'v04_1.jpeg'],
    'v05': ['v05.jpeg', 'v05_1.jpeg'],
    'v06': ['v06.jpeg'],
    'v07': ['v07.jpeg'],
    'v08': ['v08.jpeg'],
    'v09': ['v09.jpeg', 'v09_1.jpeg', 'v09_2.jpeg'],
    'v10': ['v10.jpeg', 'v10_1.jpeg'],
    'v11': ['v11.jpeg', 'v11_1.jpeg'],
    'v12': ['v12.jpeg', 'v12_1.jpeg', 'v12_2.jpeg'],
    'v13': ['v13.jpeg', 'v13_1.jpeg', 'v13_2.jpeg'],
    'v14': ['v14.jpeg', 'v14_1.jpeg', 'v14_2.jpeg'],
    'v15': ['v15.jpeg', 'v15_1.jpeg'],
    'v16': ['v16.jpeg', 'v16_1.jpeg'],
    'v17': ['v17.jpeg', 'v17_1.jpeg', 'v17_2.jpeg'],
    'v18': ['v18.jpeg', 'v18_1.jpeg'],
    'v19': ['v19.jpeg', 'v19_1.jpeg'],
    'v20': ['v20.jpeg', 'v20_1.jpeg', 'v20_2.jpeg'],
    'v21': ['v21.jpeg']
  };
  
  const availableImages = imageMap[baseFileName];
  if (availableImages) {
    return availableImages.map(img => `/images/${img}`);
  }
  
  return [];
};

// Utility function to get the primary image for a product
export const getPrimaryImage = (sku: string): string | null => {
  const images = getProductImages(sku);
  return images.length > 0 ? images[0] : null;
};