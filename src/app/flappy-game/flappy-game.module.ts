import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlappyGameComponent } from './flappy-game.component';

@NgModule({
  declarations: [FlappyGameComponent],
  imports: [CommonModule],
  exports: [FlappyGameComponent]
})
export class FlappyGameModule {}
