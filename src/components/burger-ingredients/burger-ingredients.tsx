import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '@store';
import { selectIngredientsRequest, selectIngredients } from '@selectors';
import { fetchIngredients } from '@slices';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();

  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const isLoading: boolean = useSelector(selectIngredientsRequest);

  useEffect(() => {
    if (!ingredients.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading]);

  const { buns, mains, sauces } = useMemo(() => {
    const byType = (tab: TTabMode): TIngredient[] =>
      ingredients.filter((item) => item.type === tab);
    return {
      buns: byType('bun'),
      mains: byType('main'),
      sauces: byType('sauce')
    };
  }, [ingredients]);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });
  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <Preloader />;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
