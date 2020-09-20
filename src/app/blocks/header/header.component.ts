/* import { ChangeDetectionStrategy } from '@angular/compiler/src/core'; */
import { Component, Input, OnInit, Output ,EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  user:User;

  @Output()
  logoutEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
