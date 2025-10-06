import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list.component',
  imports: [AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userService = inject(UserService);
  users$ = this.userService.getUserList();
}
