import { createAction, props } from "@ngrx/store";

/**
 * - Un'azione è composta da:
 *   - una chiave `type` (obbligatoria), che rappresenta il tipo di evento
 *   - dei parametri dichiarabili tramite la feature props di NgRx che permettono di passare dati al reducer
 * - La convenzione consigliata per il `type` è: [nome reducer] nome azione
 * - L'uso di props è facoltativo: possono essere omessi se l'azione non ha bisogno di dati aggiuntivi
 */

export const initList = createAction(
    '[List] Init'
);

export const set = createAction(
    '[List] Set',
    props<{ value: string[] }>()
);

export const push = createAction(
    '[List] Push',
    props<{ value: string }>()
);

export const splice = createAction(
    '[List] Splice',
    props<{ value: number }>()
);

export const pop = createAction(
    '[List] Pop'
);

export const loadList = createAction(
    '[List] Load list'
);

export const loadListSuccess = createAction(
    '[List] Load success',
    props<{ value: string[] }>()
);

export const loadListFailure = createAction(
    '[List] Load failure',
    props<{ error: any }>()
);