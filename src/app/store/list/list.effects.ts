import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { initList, loadList, loadListFailure, loadListSuccess, pop, push, set, splice } from "./list.actions";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectList } from "./list.selectors";

@Injectable()
export class ListEffects {
    constructor(
        private store: Store<{list: string[]}>,
        private actions$: Actions
    ) {}

    saveList$ = createEffect(() => this.actions$.pipe(
            ofType(push, splice, pop),
            withLatestFrom(this.store.select(selectList)),
            tap(([action, list]) => {
                localStorage.setItem('NgRx_demo_list', JSON.stringify(list));
            })
        ),
        { dispatch: false }
    );

    /**
     * Le operazioni di caricamento in NgRx richiedono l'uso di due o più azioni (in questa demo init e set),
     * il motivo è che con questo approccio è possibile separare l'azione di avvio del caricamento
     * dalle operazioni che avvengono al termine (quando i valori vengono prelevati)
     */

    loadList$ = createEffect(() => this.actions$.pipe(
            ofType(initList),
            switchMap(() => {
                const storedList = localStorage.getItem('NgRx_demo_list');

                if (storedList) {
                    return of(set({value: JSON.parse(storedList)}));
                }

                return of(set({value: []}));
            })
        )
    );

    /**
     * Avessimo avuto un backend con cui interagire questo sarebbe stato un esempio di caricamento da DB tramite NgRx
     */

    // loadListFromDB$ = createEffect(() => this.actions$.pipe(
    //         ofType(loadList),
    //         switchMap(() =>
    //             this.listService.getList().pipe(
    //                 map((list: string[]) => loadListSuccess({ value: list })),
    //                 catchError(error => of(loadListFailure({ error })))
    //             )
    //         )
    //     )
    // );
}