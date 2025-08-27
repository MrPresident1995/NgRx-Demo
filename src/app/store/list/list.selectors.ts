import { createFeatureSelector, createSelector } from "@ngrx/store";

/**
 * I selector permettono di accedere a una porzione dello stato gestita da uno specifico reducer
 * 
 * Utilizzando createSelector, è possibile non solo selezionare il valore desiderato ma anche trasformarlo 
 * direttamente applicando filtri, operazioni di mapping o modifiche come trim, concat, filter, ecc
 */

export const selectListState = createFeatureSelector<string[]>('list');

export const selectList = createSelector(
  selectListState,
  (state) => state
);

/**
 * È possibile dichiarare un selector in forma semplificata come una normale funzione
 * 
 * Questo approccio è veloce e semplice da configurare, ma presenta alcune limitazioni:
 * - non supporta la memoization automatica (ottimizzazione delle performance)
 * - non consente facilmente la composizione con altri selector
 * - non è adatto a trasformazioni o logiche derivate complesse
 */

// export const selectList = (state: {list: string[]}) => state.list;