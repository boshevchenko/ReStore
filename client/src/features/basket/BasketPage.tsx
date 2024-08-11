// import { useEffect, useState } from "react"
// import { Basket } from "../../app/models/basket";
// import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";

import { Button, Grid, Typography } from "@mui/material";
// import { Add, Delete, Remove } from "@mui/icons-material";
// import { useStoreContext } from "../../app/context/StoreContext";
// import { useState } from "react";
// import agent from "../../app/api/agent";
// import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
// import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";
// import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
// import { removeItem, setBasket } from "./basketSlice";

export default function BasketPage() {

    //const { basket, setBasket, removeItem } = useStoreContext();

    //const dispatch = useAppDispatch();
    //const basket = useAppSelector(state => state.basket.basket);
    const { basket } = useAppSelector(state => state.basket);

    // const [status, setStatus] = useState({
    //     loading: false,
    //     name: ''
    // });

    // function handleAddItem(productId: number, name: string) {
    //     setStatus({ loading: true, name });
    //     agent.Basket.addItem(productId)
    //         .then(basket => dispatch(setBasket(basket))) //setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, name: '' }))
    // }

    // function handleRemoveItem(productId: number, quantity = 1, name: string) {
    //     setStatus({ loading: true, name });
    //     agent.Basket.removeItem(productId, quantity)
    //         .then(() => dispatch(removeItem({ productId, quantity }))) //removeItem(productId, quantity))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, name: '' }))
    // }

    // const [loading, setLoading] = useState(true);
    // const [basket, setBasket] = useState<Basket | null>(null);

    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.error(error))
    //         .finally(() => setLoading(false))
    // })

    // if (loading) return <LoadingComponent message="Loading basket..." />

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    //const totalAmount = () => basket.items.reduce((sum, item) => item.quantity * item.price + sum, 0);

    return (
        <>
            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        // onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}
                                        // loading={status.loading && status.name === 'rem' + item.productId} color="warning"
                                        loading={status === 'pendingRemoveItemrem' + item.productId} color="warning"
                                    >
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        // onClick={() => handleAddItem(item.productId, 'add' + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        // loading={status.loading && status.name === 'add' + item.productId} color="success"
                                        loading={status === 'pendingAddItem' + item.productId} color="success"
                                    >
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        //onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))}
                                        // loading={status.loading && status.name === 'del' + item.productId} color="error"
                                        loading={status === 'pendingRemoveItemdel' + item.productId} color="error"
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <BasketTable items={basket.items} />
            <Grid container>
                <Grid item xs={5} />
                <Grid item xs={7}>
                    <BasketSummary
                    // subtotal={totalAmount()}
                    // deliveryFee={totalAmount() > 10000 ? 0 : 500} 
                    />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                        style={{ marginTop: 5 }}
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}