import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-side-board',
  imports: [CommonModule,NgbCarouselModule],
  templateUrl: './side-board.component.html',
  styleUrl: './side-board.component.css'
})
export class SideBoardComponent {

   sidebarImges  : any[]= [
     { title: 'House Image 1',url: 'Retal-photo/istockphoto-1156284425-612x612.jpg'},
     { title: 'House Image 1',url:'Retal-photo/istockphoto-1266155645-612x612.jpg'},
      { title: 'House Image 1',url: 'Retal-photo/istockphoto-1357529933-612x612.jpg'},
        { title: 'House Image 1',url: 'Retal-photo/istockphoto-1990444472-612x612.jpg'}
   
   ];

   


}
