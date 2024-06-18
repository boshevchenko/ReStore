import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
import { useState, useEffect } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
        // const get = async function () {
        //   const data = await fetch('http://localhost:5000/api/products');
        //   const json = await data.json();
        //   console.log(json);
        //   setProducts(json);
        // }
        // get();
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>
    )
}