import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { PositionChange } from '../position-change';
import { TransformManipulator } from '../transform-manipulator';


@Component({
  selector: '[app-draggable]',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})
export class DraggableComponent extends TransformManipulator {
  isDrag = false;
  startX: number;
  startY: number
  @Input('drag-enabled') dragEnabled: boolean;
  @Output() positionChanged = new EventEmitter<PositionChange>();

  constructor(private elRef: ElementRef, renderer: Renderer2) {
    super(elRef, renderer);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent){
    this.preventDefaultDragAndDrop(event);
    if (this.dragEnabled) {
      this.isDrag = true;
      this.startX = event.screenX;
      this.startY = event.screenY;
    }
  }

  preventDefaultDragAndDrop(event: MouseEvent) {
    if (event.preventDefault)
      event.preventDefault();
    else
      event.returnValue = false;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent){
    if (this.isDrag) {
      this.isDrag = false;
      super.setTransform('');
      let change = this.computeChangeDimension(event);
      this.positionChanged.emit(change);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    if (this.isDrag) {
      let change = this.computeChangeDimension(event);
      // TODO if outside the bounds move back inside the board
      super.setTransform(change.toTranslateString());
    }
  }

  computeChangeDimension(event: MouseEvent): PositionChange {
    return new PositionChange(event.screenX - this.startX, event.screenY - this.startY);
  }

}