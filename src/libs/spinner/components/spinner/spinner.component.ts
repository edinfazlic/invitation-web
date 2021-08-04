import {AfterViewInit, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {getSpinnerCounter} from '../../state-management/spinner.selectors';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterViewInit {
  timer = null;
  showSpinner: boolean;

  constructor(
    private store: Store
  ) {
  }

  ngAfterViewInit(): void {
    this.observeSpinnerActivation();
  }

  private observeSpinnerActivation(): void {
    this.store.select(getSpinnerCounter)
      .subscribe((state) => {
        clearTimeout(this.timer);

        if (state?.counter) {
          this.showSpinner = true;
        } else {
          /** Use timer for avoiding flashing of spinner between requests breaks */
          this.timer = setTimeout(() => {
            this.showSpinner = false;
          }, 300);
        }
      });
  }
}
