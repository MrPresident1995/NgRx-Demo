import { createAction, props } from "@ngrx/store";

/**
 * - Un'azione è composta da:
 *   - una chiave `type` (obbligatoria), che rappresenta il tipo di evento
 *   - dei parametri dichiarabili tramite la feature props di NgRx che permettono di passare dati al reducer
 * - La convenzione consigliata per il `type` è: [nome reducer] nome azione
 * - L'uso di props è facoltativo: possono essere omessi se l'azione non ha bisogno di dati aggiuntivi
 */

export const initLang = createAction(
    '[Lang] Init'
);

export const set = createAction(
    '[Lang] Set',
    props<{ value: string }>()
);