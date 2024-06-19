import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
import { useState, useEffect } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        agent.Catalog.list()
            .then((products) => {
                setProducts(products);
                setLoading(false);
            })
            .catch(error => console.log(error))
        //.finally(() => setLoading(false))

        // fetch('http://localhost:5000/api/products')
        //     .then(response => response.json())
        //     .then(data => setProducts(data))

        // const get = async function () {
        //   const data = await fetch('http://localhost:5000/api/products');
        //   const json = await data.json();
        //   console.log(json);
        //   setProducts(json);
        // }
        // get();
    }, [])

    if (loading) return <LoadingComponent message="Loading Products..." />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}