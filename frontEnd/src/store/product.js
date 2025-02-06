import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields" };
        }

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();

            set((state) => ({
                products: [...state.products, data.data],
            }));

            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: "An error occurred. Please try again." };
        }
    },
    fetchProducts: async()=>{
         const res = await fetch("/api/products");
         const data = await res.json();
         set({products: data.data});
    },
    deleteProduct: async(pid)=>{
        
        try {
            // Simulate an API call or action to delete the product
            // Example:
            await fetch(`/api/products/${pid}`, { method: 'DELETE' });
            set((state) => ({
              products: state.products.filter(product => product._id !== pid)
            }));
            return { success: true, message: 'Product deleted successfully' };
          } catch (error) {
            return { success: false, message: 'Failed to delete product' };
          }
        },
        editProduct: async (updatedProduct) => {
            try {
              // Simulate an API call to update the product
              await fetch(`/api/products/${updatedProduct._id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedProduct),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        
              set((state) => ({
                products: state.products.map((product) =>
                  product._id === updatedProduct._id ? updatedProduct : product
                ),
              }));
        
              return { success: true, message: 'Product updated successfully' };
            } catch (error) {
              return { success: false, message: 'Failed to update product' };
            }
          },
}));
