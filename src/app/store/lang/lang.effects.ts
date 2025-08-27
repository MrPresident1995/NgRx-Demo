import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { initLang, set } from "./lang.actions";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectLang } from "./lang.selectors";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LangEffects {
    constructor(
        private store: Store<{lang: string}>,
        private actions$: Actions,
        private translate: TranslateService
    ) {}

    saveLang$ = createEffect(() => this.actions$.pipe(
            ofType(set),
            withLatestFrom(this.store.select(selectLang)),
            tap(([action, lang]) => {
                this.translate.use(lang);
                localStorage.setItem('NgRx_demo_lang', lang);
            })
        ),
        { dispatch: false }
    );
    
    /**
     * Le operazioni di caricamento in NgRx richiedono l'uso di due o più azioni (in questa demo init e set),
     * il motivo è che con questo approccio è possibile separare l'azione di avvio del caricamento
     * dalle operazioni che avvengono al termine (quando i valori vengono prelevati)
     */
    
    loadLang$ = createEffect(() => this.actions$.pipe(
        ofType(initLang),
        switchMap(() => {
            const storedLang = localStorage.getItem('NgRx_demo_lang');

            if (storedLang) {
                return of(set({ value: storedLang }));
            }

            return of(set({ value: 'it' }));
        })
    ));
}