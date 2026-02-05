import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { useTheme } from '../../context/ThemeContext';
import { Table } from '../../components/admin/Table';
import { Modal } from '../../components/admin/Modal';

export const AdminProducts = () => {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: adminApi.getProducts
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: adminApi.getCategories
  });

  const createMutation = useMutation({
    mutationFn: adminApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.refetchQueries({ queryKey: ['admin-products'] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Create error:', error);
      alert('Failed to create product');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => adminApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.refetchQueries({ queryKey: ['admin-products'] });
      setIsModalOpen(false);
      setEditingProduct(null);
    },
    onError: (error) => {
      console.error('Update error:', error);
      alert('Failed to update product');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentProducts = products.slice(0, 3);

  const columns = [
    {
      key: 'imageUrl',
      header: 'Image',
      render: (product: any) => (
        <img
          src={`https://dessertshopbackend.onrender.com${product.imageUrl}`}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
      )
    },
    { key: 'name', header: 'Name', render: (product: any) => (
      <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</span>
    )},
    { key: 'price', header: 'Price', render: (product: any) => (
      <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>${product.price}</span>
    )},
    { key: 'stock', header: 'Stock', render: (product: any) => (
      <span className={`px-2 py-1 rounded text-sm ${
        product.stock < 10 ? 'bg-red-600 text-white' :
        product.stock < 20 ? 'bg-yellow-600 text-white' :
        'bg-green-600 text-white'
      }`}>
        {product.stock}
      </span>
    )},
    { key: 'category', header: 'Category', render: (product: any) => (
      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{product.category?.name || 'N/A'}</span>
    )},
    {
      key: 'actions',
      header: 'Actions',
      render: (product: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingProduct(product);
              setIsModalOpen(true);
            }}
            className={`px-2 py-1 rounded transition ${
              isDark 
                ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700'
                : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this product?')) {
                deleteMutation.mutate(product._id);
              }
            }}
            className={`px-2 py-1 rounded transition ${
              isDark 
                ? 'text-red-400 hover:text-red-300 hover:bg-gray-700'
                : 'text-red-600 hover:text-red-800 hover:bg-red-50'
            }`}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex justify-between items-center">
          <div className={`h-8 w-48 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          <div className={`h-10 w-32 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
        </div>
        <div className={`h-64 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Products</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Manage your product inventory</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Table */}
        <div className="lg:col-span-2">
          {/* Search */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 mb-4`}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border`}>
            <Table data={filteredProducts} columns={columns} loading={isLoading} />
          </div>
        </div>

        {/* Recent Added Products */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>RECENT ADDED PRODUCTS</h3>
          <div className="space-y-4">
            {recentProducts.map((product: any) => (
              <div key={product._id} className="flex items-center space-x-4">
                <img
                  src={`https://dessertshopbackend.onrender.com${product.imageUrl}`}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{product.name}</p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>${product.price}</p>
                </div>
                <div className="text-right">
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>{product.stock} in stock</p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{product.category?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Product Name"
                defaultValue={editingProduct?.name}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price"
                defaultValue={editingProduct?.price}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Product Description"
              defaultValue={editingProduct?.description}
              className={`w-full p-3 rounded-lg border h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="category"
                defaultValue={editingProduct?.category?._id || ''}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <input
                name="stock"
                type="number"
                placeholder="Stock Quantity"
                defaultValue={editingProduct?.stock}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>
            <input
              name="image"
              type="file"
              accept="image/*"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 
               editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};