import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader, IngredientDetailsUI, TextLabelUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import {
  selectIngredientsRequest,
  selectIngredients,
  selectIngredientsError
} from '@selectors';
import { fetchIngredients } from '@slices';

import { IngredientDetailsProps } from './type';

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  fullPage = false
}) => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsRequest);
  const error = useSelector(selectIngredientsError);

  useEffect(() => {
    if (!ingredients.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [ingredients.length, isLoading, dispatch]);

  const ingredientData =
    ingredients.find((ingredient: TIngredient) => ingredient._id === id) ??
    null;

  if (!ingredientData && isLoading) return <Preloader />;

  if (error) return <TextLabelUI text={error} />;

  if (!ingredientData || !ingredients.length)
    return <TextLabelUI text={'Ингредиент не найден!'} />;

  return (
    <IngredientDetailsUI ingredientData={ingredientData} fullPage={fullPage} />
  );
};
