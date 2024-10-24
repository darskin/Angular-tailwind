import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, RouterLink], // Importa CommonModule directamente
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }

  closeSidebar() {
    this.sidebarService.toggleSidebar();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.sidebar');
    const clickedButton = target.closest('.hamburger-button');
    if (!clickedInside && !clickedButton && this.isSidebarOpen) {
      this.closeSidebar();
    }
  }
}
