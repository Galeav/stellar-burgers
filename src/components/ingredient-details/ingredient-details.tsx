import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader, IngredientDetailsUI, TextLabel } from '@ui';
import { TIngredient } from '@utils-types';
import { useSelector } from '@store';
import {
  selectIngredientsRequest,
  selectIngredients,
  selectIngredientsError
} from '@selectors';

import { IngredientDetailsProps } from './type';

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  fullPage = false
}) => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsRequest);
  const error = useSelector(selectIngredientsError);

  const ingredientData =
    ingredients.find((ingredient: TIngredient) => ingredient._id === id) ??
    null;

  if (!ingredientData) {
    return isLoading ? (
      <Preloader />
    ) : (
      <TextLabel text={error ?? 'Ингредиент не найден!'} />
    );
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} fullPage={fullPage} />
  );
};
