import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../hooks';
import { SET_CURRENT_TAB } from '../../utils/constants';

type TIngredientsSelector = {
  tabClickHandler: (tab: string) => void;
};

const IngredientsSelector: FC<TIngredientsSelector> = ({ tabClickHandler }) => {
  const currentTab = useSelector((store) => store.currentTab);
  const dispatch = useDispatch();

  function setCurrent(currentTab: string) {
    dispatch({ type: SET_CURRENT_TAB, currentTab });
    tabClickHandler(currentTab);
  }

  return (
    <div style={{ display: 'flex', marginBottom: 40 }}>
      <Tab
        value="buns"
        active={currentTab === 'buns'}
        onClick={() => setCurrent('buns')}
      >
        Булки
      </Tab>
      <Tab
        value="sauces"
        active={currentTab === 'sauces'}
        onClick={() => setCurrent('sauces')}
      >
        Соусы
      </Tab>
      <Tab
        value="toppings"
        active={currentTab === 'toppings'}
        onClick={() => setCurrent('toppings')}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientsSelector;
