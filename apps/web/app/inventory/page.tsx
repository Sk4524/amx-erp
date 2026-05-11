"use client";

import Sidebar from "../../components/Sidebar";
import AuthGuard from "../../components/AuthGuard";

import { useEffect, useState } from "react";

import api from "../../lib/api";

export default function InventoryPage() {

  const [items, setItems] = useState<any[]>([]);

  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState("");

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  // LOAD ROLE
  useEffect(() => {

    const savedRole =
      localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }

  }, []);

  // FETCH INVENTORY
  const fetchInventory = async () => {

    try {

      const res = await api.get(
        `/inventory?search=${search}`
      );

      console.log(
        "INVENTORY RESPONSE:",
        res.data
      );

      setItems(
        res.data.data || []
      );

    } catch (err) {

      console.log(err);

      setItems([]);
    }
  };

  // THIS WAS MISSING
  useEffect(() => {

    fetchInventory();

  }, [search]);

  // ADD PRODUCT
  const addProduct = async () => {

    try {

      await api.post(
        "/inventory",
        {
          productName,
          sku,
          quantity: Number(quantity),
          price: Number(price),
          category,
        }
      );

      setProductName("");
      setSku("");
      setQuantity("");
      setPrice("");
      setCategory("");

      fetchInventory();

      alert("Product Added ✅");

    } catch (err: any) {

      console.log(err);

      alert(
        JSON.stringify(
          err?.response?.data ||
          "Add Product Failed"
        )
      );
    }
  };

  // UPDATE PRODUCT
  const updateProduct = async () => {

    try {

      await api.put(
        `/inventory/${editingId}`,
        {
          productName,
          sku,
          quantity: Number(quantity),
          price: Number(price),
          category,
        }
      );

      setEditingId("");

      setProductName("");
      setSku("");
      setQuantity("");
      setPrice("");
      setCategory("");

      fetchInventory();

      alert("Product Updated ✅");

    } catch (err: any) {

      console.log(err);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id: string) => {

    try {

      await api.delete(
        `/inventory/${id}`
      );

      fetchInventory();

      alert("Product Deleted ✅");

    } catch (err: any) {

      console.log(err);
    }
  };

  return (

    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="p-10 w-full ml-72 bg-gray-100 min-h-screen text-black">

          {/* TOP */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-bold">
                Inventory
              </h1>

              <p className="text-gray-500 mt-1">
                Manage products and stock
              </p>

            </div>

            <input
              placeholder="Search product..."
              className="border p-3 rounded-xl w-[320px] bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* ADMIN FORM */}
          {role === "ADMIN" && (

            <div className="bg-white p-6 rounded-2xl shadow mb-8">

              <h2 className="text-2xl font-semibold mb-5">

                {editingId
                  ? "Update Product"
                  : "Add Product"}

              </h2>

              <div className="grid grid-cols-5 gap-4">

                <input
                  placeholder="Product Name"
                  className="p-3 border rounded-xl"
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                />

                <input
                  placeholder="SKU"
                  className="p-3 border rounded-xl"
                  value={sku}
                  onChange={(e) =>
                    setSku(e.target.value)
                  }
                />

                <input
                  placeholder="Quantity"
                  type="number"
                  className="p-3 border rounded-xl"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                />

                <input
                  placeholder="Price"
                  type="number"
                  className="p-3 border rounded-xl"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                />

                <input
                  placeholder="Category"
                  className="p-3 border rounded-xl"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                />

              </div>

              <button
                onClick={
                  editingId
                    ? updateProduct
                    : addProduct
                }
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >

                {editingId
                  ? "Update Product"
                  : "Add Product"}

              </button>

            </div>

          )}

          {/* TABLE */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-semibold">
                Inventory List
              </h2>

              <div className="text-sm text-gray-500">
                Total: {items.length}
              </div>

            </div>

            {/* HEADER */}
            <div className="grid grid-cols-6 border-b pb-3 font-semibold text-gray-500">

              <div>Product</div>
              <div>SKU</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Category</div>
              <div>Actions</div>

            </div>

            {/* BODY */}
            {items.length === 0 ? (

              <p className="py-6 text-gray-500">
                No inventory found
              </p>

            ) : (

              items.map((item: any) => (

                <div
                  key={item.id}
                  className="grid grid-cols-6 py-4 border-b items-center hover:bg-gray-50 px-2 rounded-lg"
                >

                  <div className="font-medium">
                    {item.productName}
                  </div>

                  <div>
                    {item.sku}
                  </div>

                  <div
                    className={
                      item.quantity <= 5
                        ? "text-red-500 font-bold"
                        : ""
                    }
                  >
                    {item.quantity}

                    {item.quantity <= 5 && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    )}

                  </div>

                  <div className="text-green-600 font-semibold">
                    ₹{item.price}
                  </div>

                  <div>
                    {item.category}
                  </div>

                  <div>

                    {role === "ADMIN" ? (

                      <div className="flex gap-4">

                        <button
                          className="text-blue-600"
                          onClick={() => {

                            setEditingId(item.id);

                            setProductName(
                              item.productName
                            );

                            setSku(item.sku);

                            setQuantity(
                              item.quantity.toString()
                            );

                            setPrice(
                              item.price.toString()
                            );

                            setCategory(
                              item.category
                            );
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-500"
                          onClick={() =>
                            deleteProduct(item.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    ) : (

                      <span className="text-gray-400 text-sm">
                        View Only
                      </span>

                    )}

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}