import { RootState } from './../features/index';
import {useDispatch, useSelector} from 'react-redux'
import { delCart, addToCart, recoverCart, softDelCart, updateCart } from '../features/slices/cartSlice';
import { Product } from '../interfaces';

export const useCartSlice = () => {

    const data = useSelector((state: RootState) => state.cart)

    const dispatch = useDispatch()

    return {
        data: data.data,
        total: data.total,
        delCart: (id: string) => dispatch(delCart({_id: id})),
        softDelCart: (id: string) => dispatch(softDelCart({_id: id})),
        recoverCart: (id: string) => dispatch(recoverCart({_id: id})),
        updateCart: (product: Product) => dispatch(updateCart(product)),
        addToCart: (product: Product) => dispatch(addToCart(product))
    }
}