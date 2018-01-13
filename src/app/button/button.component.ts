import {Component, OnInit, Input, HostListener} from '@angular/core';
import {Bounds} from '../bounds/bounds';
import {SocketService} from '../socket.service';

let DEFAULT_SIZE = 32;

@Component({
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() bounds: Bounds;
  scale: number = 1;
  borderVisible: boolean = false;

  constructor(private socketservice: SocketService) {
    //TODO remove
    socketservice.connect();
  }

  ngOnInit() {
    let currentSize = this.min(this.bounds.width, this.bounds.height);
    this.scale = currentSize / DEFAULT_SIZE;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.borderVisible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.borderVisible = false;
  }

  @HostListener('click')
  onClickHandler() {
    console.log('clicked');
    //TODO remove
    this.socketservice.ping();
  }

  min(a: number, b: number): number {
    return a < b ? a : b;
  }
}
