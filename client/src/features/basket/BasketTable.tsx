import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.basket);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isBasket && <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
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
                                {isBasket &&
                                    <LoadingButton
                                        // onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}
                                        // loading={status.loading && status.name === 'rem' + item.productId} color="warning"
                                        loading={status === 'pendingRemoveItemrem' + item.productId} color="warning"
                                    >
                                        <Remove />
                                    </LoadingButton>
                                }
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton
                                        // onClick={() => handleAddItem(item.productId, 'add' + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        // loading={status.loading && status.name === 'add' + item.productId} color="success"
                                        loading={status === 'pendingAddItem' + item.productId} color="success"
                                    >
                                        <Add />
                                    </LoadingButton>
                                }
                            </TableCell>
                            <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                            {isBasket &&
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
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}