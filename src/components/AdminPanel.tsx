import { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { products } from '@/data/products';
import type { Product } from '@/types/product';

export const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsOpen(true);
  };

  const handleSave = () => {
    // In a real app, you'd save to a database
    console.log('Saving product:', formData);
    setIsOpen(false);
    setEditingProduct(null);
    setFormData({});
  };

  const handleCancel = () => {
    setIsOpen(false);
    setEditingProduct(null);
    setFormData({});
  };

  if (!isOpen) {
    return null; // Remove the plus button completely
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-br from-slate-900 to-purple-900 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="text-purple-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-purple-300 text-sm mb-2">SKU</label>
                <Input
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="bg-white/10 border-purple-300/30 text-white"
                  placeholder="Product SKU"
                />
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-2">Details</label>
                <Input
                  value={formData.details || ''}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="bg-white/10 border-purple-300/30 text-white"
                  placeholder="Product details (size, weight, etc.)"
                />
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-2">Features</label>
                <Textarea
                  value={formData.features || ''}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="bg-white/10 border-purple-300/30 text-white"
                  placeholder="Product features and description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 text-sm mb-2">Min Price (USD)</label>
                  <Input
                    type="number"
                    value={formData.minPrice || ''}
                    onChange={(e) => setFormData({ ...formData, minPrice: Number(e.target.value) })}
                    className="bg-white/10 border-purple-300/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 text-sm mb-2">Max Price (USD)</label>
                  <Input
                    type="number"
                    value={formData.maxPrice || ''}
                    onChange={(e) => setFormData({ ...formData, maxPrice: Number(e.target.value) })}
                    className="bg-white/10 border-purple-300/30 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Product List */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Existing Products</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.slice(0, 10).map((product) => (
                <div
                  key={product.sku}
                  className="bg-white/10 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="text-white font-medium">{product.sku}</div>
                    <div className="text-purple-300 text-sm truncate max-w-xs">
                      {product.features}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(product)}
                      size="sm"
                      variant="outline"
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};