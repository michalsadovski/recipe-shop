import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  openSection = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(content: string) {
    this.openSection.emit(content)
  }

}
