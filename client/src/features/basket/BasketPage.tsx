// import { useEffect, useState } from "react"
// import { Basket } from "../../app/models/basket";
// import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";

import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";

export default function BasketPage() {

    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

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
            <TableContainer component={Paper}>
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
                                    <LoadingButton onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}
                                        loading={status.loading && status.name === 'rem' + item.productId} color="warning">
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton onClick={() => handleAddItem(item.productId, 'add' + item.productId)}
                                        loading={status.loading && status.name === 'add' + item.productId} color="success">
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                                        loading={status.loading && status.name === 'del' + item.productId} color="error">
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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