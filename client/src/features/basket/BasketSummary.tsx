import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";
import { Order } from "../../app/models/order";
// import { useStoreContext } from "../../app/context/StoreContext";

// interface Props {
//     subtotal: number,
//     deliveryFee: number
// }
interface Props {
    order?: Order | null;
}

export default function BasketSummary({ order }: Props) {  //{ subtotal, deliveryFee }: Props) {
    // const { basket } = useStoreContext();
    const { basket } = useAppSelector(state => state.basket);

    const subtotal = order ? order.orderItems.reduce((sum, item) => item.quantity * item.price + sum, 0) ?? 0
        : basket?.items.reduce((sum, item) => item.quantity * item.price + sum, 0) ?? 0;
    const deliveryFee = subtotal > 10000 || subtotal === 0 ? 0 : 500;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}