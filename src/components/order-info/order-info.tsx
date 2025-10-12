import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '@ui';
import { OrderInfoUI, TextLabel } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import {
  selectFeedOrders,
  selectIngredientsRequest,
  selectIngredients,
  selectOrderView,
  selectProfileOrders,
  selectIngredientsError
} from '@selectors';
import { fetchIngredients, fetchOrderByNumber } from '@slices';
import { OrderInfoProps } from './type';

export const OrderInfo: FC<OrderInfoProps> = ({ fullPage = false }) => {
  const { number } = useParams<{ number: string }>();
  const num = Number(number);

  const dispatch = useDispatch();

  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsRequest);
  const ingredientsError = useSelector(selectIngredientsError);

  const ordersFeed = useSelector(selectFeedOrders);
  const ordersProfile = useSelector(selectProfileOrders);

  const { current, request: orderLoading } = useSelector(selectOrderView);

  useEffect(() => {
    if (!ingredients.length && !isIngredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [ingredients.length, isIngredientsLoading, dispatch]);

  const found = useMemo(
    () =>
      ordersFeed.concat(ordersProfile).find((order) => order.number === num) ||
      null,
    [ordersFeed, ordersProfile, num]
  );

  useEffect(() => {
    if (!found && !current && !orderLoading && num) {
      dispatch(fetchOrderByNumber(num));
    }
  }, [found, current, orderLoading, num, dispatch]);

  const orderData: TOrder | null = found ?? current ?? null;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    if (ingredientsError) {
      return <TextLabel text={`Не удалось найти заказ ${num}`} />;
    }
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} fullPage={fullPage} />;
};
