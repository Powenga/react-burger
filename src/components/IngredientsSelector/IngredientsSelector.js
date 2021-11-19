import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/actions';

export default function IngredientsSelector() {
  const currentTab = useSelector((store) => store.currentTab);
  const dispatch = useDispatch();

  function setCurrent(currentTab) {
    dispatch({ type: SET_CURRENT_TAB, currentTab });
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
}
