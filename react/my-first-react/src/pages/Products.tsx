import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import CategoryType from "../types/CategoryType";

function Products() {

    const [products, setProducts] = useState<ProductType[]>([]);

    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const [categories, setCategories] = useState<CategoryType[]>([]);

    function handleProductName(event: any) {
        setProductName(event.target.value);
    }

    function handleProductPrice(event: any) {
        setProductPrice(event.target.value);
    }

    function handleCategoryId(event: any) {
        setCategoryId(event.target.value);
    }

    function handleDescription(event: any) {
        setDescription(event.target.value);
    }

    //api request to get products
    async function getProducts() {
        const response = await axios.get("http://localhost:8081/products");
        setProducts(response.data);
    }

    async function loadCategories() {
        const apiResponse = await axios.get("http://localhost:8081/categories");
        setCategories(apiResponse.data);
    }

    async function saveProduct() {
        await axios.post("http://localhost:8081/products", {
            name: productName,
            price: productPrice,
            categoryId: categoryId,
            description: description
        });
        getProducts();
    }

    useEffect(function () {
        getProducts();
        loadCategories();
    }, [])

    const [productEditing, setProductEditing] = useState<ProductType | null>();

    function editProduct(product: ProductType) {
        setProductEditing(product);
        setProductName(product.name);
        setProductPrice(product.price);
        setCategoryId(product.category.id);
        setDescription(product.description);
    }

    async function updateProduct() {
        try {
            await axios.put(`http://localhost:8081/products/${productEditing?.id}`, {
                name: productName,
                price: productPrice,
                categoryId: categoryId,
                description: description
            });
            getProducts();
            setProductEditing(null);
            setProductName("");
            setProductPrice(0);
            setCategoryId(0);
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId: number) {
        try {
            await axios.delete(`http://localhost:8081/products/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">
                Products
            </h1>

            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[200px] text-left">Product Name</th>
                        <th className="p-2 text-left w-[100px]">Product Price</th>
                        <th className="p-2 text-left w-[200px]">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(function (product) {
                        return (
                            <tr>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.id}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.name}</td>
                                <td className="p-2 text-slate-600 text-right border-b border-slate-200">{product.price}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.category.name}</td>
                                <td className="p-2 border-b border-slate-200">
                                    <button className="me-3" type="button"
                                        onClick={() => editProduct(product)}>Edit</button>
                                    <button type="button"
                                        onClick={() => deleteProduct(product.id)}>Delete</button>       
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
                <h2 className="text-xl font-medium mb-4">
                    {productEditing ? 'Edit Product' : 'Add Product'}
                </h2>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter product name</label>
                    <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={productName} onChange={handleProductName} />
                </div>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter product price</label>
                    <input type="number" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={productPrice} onChange={handleProductPrice} />
                </div>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter category id</label>
                    <select className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={categoryId} onChange={handleCategoryId} >
                        <option value="">Select Category</option>

                        {categories.map(function (category) {
                            return (
                                <option value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter description</label>
                    <textarea className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={description} onChange={handleDescription}>
                    </textarea>
                </div>

                {productEditing ? (
                    <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={updateProduct}>Update Product</button>
                ) : (
                    <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={saveProduct}>Add Product</button>
                )}
            </div>
        </div>
    )
}

export default Products;