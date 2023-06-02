import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks: Task[] = [];

  constructor(private taskService : TaskService) {}


  // we subscribe to an observable to constantly watch it
  ngOnInit(): void {
      this.taskService.getTasks().subscribe((tasks) => { this.tasks = tasks});
  }

  deleteTask(task : Task) {
    // call delete service and filter out the task if the tasks []
    // We can think of the .subscribe() like a .then()
    this.taskService.deleteTask(task).subscribe(() => { this.tasks = this.tasks.filter(t => t.id !== task.id)});
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    // that line update the server with the new value of task.reminder
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    // make the api call to add the task in the backend and actualize the tasks in the front end
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }
}
