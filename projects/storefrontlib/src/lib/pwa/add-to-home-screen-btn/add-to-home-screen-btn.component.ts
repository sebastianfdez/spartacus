import { Component, OnInit } from '@angular/core';
import { AddToHomeScreenService } from './../services/add-to-home-screen.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-add-to-home-screen-btn',
  templateUrl: './add-to-home-screen-btn.component.html'
})
export class AddToHomeScreenBtnComponent implements OnInit {
  canPrompt$: Observable<boolean>;
  constructor(private addToHomeScreenService: AddToHomeScreenService) {}

  ngOnInit() {
    this.canPrompt$ = this.addToHomeScreenService.canPrompt$;
  }

  prompt() {
    this.addToHomeScreenService.firePrompt();
  }
}
