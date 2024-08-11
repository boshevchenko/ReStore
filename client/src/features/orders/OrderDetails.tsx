import { Typography, Grid, Button } from "@mui/material";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
// import { useLocation, useNavigate } from "react-router-dom";
import { Order } from "../../app/models/order";
// import { Link } from "react-router-dom";

interface Props {
    order: Order | null;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetails({ order, setSelectedOrder }: Props) {
    //const location = useLocation();
    // const order = location.state.data;
    //const navigate = useNavigate();

    //const [order, setOrder] = useState<Order | null>(null);
    // const [loading, setLoading] = useState(true);

    // const { id } = useParams<{ id: string }>();

    // useEffect(() => {
    //     agent.Orders.fetch(parseInt(id!))
    //         .then(response => setOrder(response))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, [id])

    // if (loading) return <LoadingComponent message="Loading order..." />

    return (
        <>
            <Grid container>
                <Grid item xs={5}>
                    <Typography variant="h5" gutterBottom>
                        Order #{order?.id} - {order?.orderStatus}
                    </Typography>
                </Grid>
                <Grid item xs={7} style={{ display: "flex", justifyContent: "flex-end", marginBottom: '5px' }}>
                    {/* <Button component={Link}
                        to='/orders'
                        variant='contained'
                        size='large'
                    >
                        BACK TO ORDERS
                    </Button> */}

                    {/* <Button onClick={() => navigate(location.state?.from || '/orders')}
                        variant='contained'
                        size='large'>
                        BACK TO ORDERS
                    </Button> */}

                    <Button onClick={() => setSelectedOrder(0)}
                        variant='contained'
                        size='large'>
                        BACK TO ORDERS
                    </Button>

                </Grid>
            </Grid >

            {order &&
                <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            }
            <Grid container>
                <Grid item xs={5} />
                <Grid item xs={7}>
                    <BasketSummary order={order} />
                </Grid>
            </Grid>

        </>
    );
}