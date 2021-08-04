import {animate, group, style, transition, trigger} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    transition(':leave', [
      style({
        'max-height': '500px', opacity: '1', visibility: 'visible'
      }),
      group([
        animate('400ms ease-in-out', style({opacity: '0'})),
        animate('600ms ease-in-out', style({'max-height': '0px'})),
        animate('700ms ease-in-out', style({visibility: 'hidden'}))
      ])
    ]),
    transition(':enter', [
      style({
        'max-height': '0px', opacity: '0', visibility: 'hidden'
      }),
      group([
        animate('1ms ease-in-out', style({visibility: 'visible'})),
        animate('600ms ease-in-out', style({'max-height': '500px'})),
        animate('800ms ease-in-out', style({opacity: '1'}))
      ])
    ])
  ]),
];
