interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: FilterBarProps) => {
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-purple-300 hover:bg-white/20'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-purple-300 hover:bg-white/20'
            }`}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Price Range Filter - Mobile Optimized */}
      <div className="w-full">
        <div className="text-purple-300 text-sm mb-3">
          Price Range: ${priceRange[0]}-${priceRange[1]} USD
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-purple-300 text-xs w-8">Min:</span>
            <input
              type="range"
              min="0"
              max="250"
              step="5"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="flex-1 accent-purple-500"
            />
            <span className="text-purple-300 text-xs w-12 text-right">${priceRange[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-300 text-xs w-8">Max:</span>
            <input
              type="range"
              min="0"
              max="250"
              step="5"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="flex-1 accent-purple-500"
            />
            <span className="text-purple-300 text-xs w-12 text-right">${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};