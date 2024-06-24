// import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
// import { Product } from "../../app/models/product"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList"
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

        // agent.Catalog.list()
        //     .then((products) => {
        //         setProducts(products);
        //         setLoading(false);
        //     })
        //     .catch(error => console.log(error))

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
    }, [productsLoaded, dispatch])

    // if (loading) return <LoadingComponent message="Loading Products..." />
    if (status.includes('pending')) return <LoadingComponent message="Loading Products..." />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}