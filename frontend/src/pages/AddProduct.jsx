import React from 'react'

function AddProduct() {
  return (
    <div>
      {/* Add/Edit Product Form */}
      <form
        onSubmit={handleAddOrUpdateProduct}
        className="bg-white shadow rounded p-4 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Product" : "Add Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Product Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleFormChange}
            placeholder="Category"
            required
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleFormChange}
            placeholder="Price"
            required
            className="border p-2 rounded"
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleFormChange}
            placeholder="Stock Quantity"
            required
            className="border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFormChange}
            ref={fileInputRef}
            className="hidden"
          />
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Choose Image
            </button>
            <span className="text-gray-600">
              {form.image ? form.image.name : "No file chosen"}
            </span>
          </div>

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
            </div>
          )}

          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Description"
            required
            className="border p-2 rounded md:col-span-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct
