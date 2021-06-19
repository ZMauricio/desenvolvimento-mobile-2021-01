import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Clientes', url: '/clientes', icon: 'person-circle' },
    { title: 'Serviços', url: '/servicos', icon: 'hammer' },
    { title: 'Sair', url: '/login', icon: 'log-out' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
