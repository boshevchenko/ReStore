import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
// import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
// import { setBasket } from "../basket/basketSlice";
interface Props {
    product: Product
}
export default function ProductCard({ product }: Props) {
    // const [loading, setLoading] = useState(false);
    // const { setBasket } = useStoreContext();
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.basket);

    // function handleAddItem(productId: number) {
    //     setLoading(true);
    //     agent.Basket.addItem(productId)
    //         .then(basket => dispatch(setBasket(basket))) //setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false));
    // }

    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            } title={product.name}
                titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.main' } }} />

            <CardMedia
                sx={{
                    height: 140,
                    backgroundSize: 'contain',
                    bgcolor: 'primary.light'
                }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary'>
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes('pendingAddItem' + product.id)}  //{loading}
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))} //handleAddItem(product.id)}
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`}
                    size="small">View</Button>
            </CardActions>
        </Card>
    )
}



