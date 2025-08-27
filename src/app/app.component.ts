import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { initList, pop, push, splice } from './store/list/list.actions';
import { initLang, set } from './store/lang/lang.actions';
import { selectList } from './store/list/list.selectors';
import { selectLang } from './store/lang/lang.selectors';
import { TranslateService } from '@ngx-translate/core';
import { LANG_EN, LANG_IT } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  LANG_IT = LANG_IT;
  LANG_EN = LANG_EN;

  newTodoTitle: string = "";

  /**
   * NgRx si basa su RxJS e di conseguenza è pensato per essere reattivo e ascoltare i cambiamenti di stato 
   * in tempo reale, per questo è fondamentale utilizzare gli Observable
   */
  todolist$: Observable<string[]>;
  currentLang$: Observable<string>;

  constructor(
    private listStore: Store<{list: string[]}>,
    private langStore: Store<{lang: string}>,
    private translate: TranslateService
  ) {
    /**
     * Il metodo select di NgRx viene utilizzato per ottenere un Observable di una porzione dello stato globale,
     * in modo simile a una subscribe, ma senza eseguire direttamente la sottoscrizione. Sarà l'`async` pipe nel template
     * a sottoscrivere l'observable e ad aggiornare automaticamente la view
     *
     * In questa demo abbiamo definito un selector (`selectList`) per accedere alla lista, ma in alternativa
     * avremmo potuto passare direttamente la chiave del reducer ('item') alla select.
     *
     * L'uso dei selector è altamente consigliato, perché:
     * - migliora la leggibilità e manutenibilità del codice
     * - consente di centralizzare e riutilizzare la logica di selezione dello stato
     * - facilita il refactoring e l'uso di strutture di stato più complesse
     */
    this.todolist$ = listStore.select(selectList);
    this.currentLang$ = langStore.select(selectLang);

    translate.setDefaultLang(LANG_IT);
  }

  ngOnInit(): void {
    this.listStore.dispatch(initList());
    this.langStore.dispatch(initLang());
  }

  /**
   * Il metodo dispatch permette di eseguire una delle action dei Reducer, avendo configurato la props
   * col parametro value possiamo anche passare la stringa che vogliamo inserire nella lista, senza
   * saremmo stati costretti, in questo caso, ad inserirvi una costante
   */
  addTodo(): void {
    if (this.newTodoTitle?.trim()) {
      this.listStore.dispatch(push({value: this.newTodoTitle.trim()}));
      this.newTodoTitle = "";
    }
  }

  removeTodo(index: number): void {
    this.listStore.dispatch(splice({value: index}));
  }

  /**
   * Il metodo popTodo() non viene utilizzato ma come possiamo vedere, dato che non è stato dichiarato
   * alcun props, non vi è necessità di passarvi alcun parametro al metodo
   */
  popTodo(): void {
    this.listStore.dispatch(pop());
  }

  changeLang(lang: string) {
    this.langStore.dispatch(set({value: lang}));
  }
}
