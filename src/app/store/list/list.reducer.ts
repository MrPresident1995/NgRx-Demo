import { createReducer, on } from "@ngrx/store";
import { pop, push, set, splice } from "./list.actions";

/**
 * Stato iniziale della lista a cui ci si vuole sottoscrivere tramite lo store NgRx
 */
const itemListInitialState: string[] = [];

/**
 * I reducer in NgRx sono funzioni pure che ricevono lo stato corrente e un'azione, queste azioni sono particolari
 * perché non mutano direttamente i valori con cui lavorano ma generano nuovi stati.
 * 
 * L'immutabilità non è solo una caratteristica ma un requisito fondamentale!
 * 
 * In questa demo per esempio nonostante sarebbe stato molto più veloce e semplice usare una push() o una splice()
 * siamo stati costretti ad usare soluzioni alternative come lo spread operator '[...state, ...]' e lo slice()
 * proprio per questo motivo
 */
export const listReducer = createReducer(
    itemListInitialState,
    on(push, (state, action) => [...state, action.value]),
    on(splice, (state, action) => [
        ...state.slice(0, action.value),
        ...state.slice(action.value + 1)
    ]),
    on(pop, (state) => [...state.slice(0, state.length-1)]),
    on(set, (state, action) => action.value)
);

