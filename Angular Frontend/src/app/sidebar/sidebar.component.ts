import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarActive = false; // Track sidebar state
  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive; // Toggle sidebar state
  }
}
