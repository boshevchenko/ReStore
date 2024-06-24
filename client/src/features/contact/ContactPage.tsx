import { Button, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { INCREMENT, decrement } from "./CounterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch(); //useDispatch();
    const data = useAppSelector(state => state.counter.data); //useSelector((state: CounterState) => state.data);
    const title = useAppSelector(state => state.counter.title); //useSelector((state: CounterState) => state.title);

    return (
        <>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="h5">The data is: {data}</Typography>
            <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
            <Button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
            {/* <Button onClick={() => dispatch({ type: INCREMENT })} variant='contained' color='primary'>Increment</Button> */}
            <Button onClick={() => dispatch(decrement(2))} variant='contained' color='secondary'>Decrement by 2</Button>
        </>
    )
}