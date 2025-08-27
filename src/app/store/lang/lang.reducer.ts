import { createReducer, on } from "@ngrx/store";
import { set } from "./lang.actions";

/**
 * Stato iniziale della lista a cui ci si vuole sottoscrivere tramite lo store NgRx
 */
const itemLangInitialState: string = 'it';

/**
 * I reducer in NgRx sono funzioni pure che ricevono lo stato corrente e un'azione, queste azioni sono particolari
 * perché non mutano direttamente i valori con cui lavorano ma generano nuovi stati.
 * 
 * L'immutabilità non è solo una caratteristica ma un requisito fondamentale!
 */
export const langReducer = createReducer(
    itemLangInitialState,
    on(set, (state, action) => action.value)
);