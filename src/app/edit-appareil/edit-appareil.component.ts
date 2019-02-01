import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppareilService } from "../services/appareil.service";

@Component({
  selector: "app-edit-appareil",
  templateUrl: "./edit-appareil.component.html",
  styleUrls: ["./edit-appareil.component.css"]
})
export class EditAppareilComponent implements OnInit {
  defaultOnOff = "off";

  constructor(
    private appareilService: AppareilService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    const name = form.value["name"];
    const status = form.value["status"];
    this.appareilService.addAppareil(name, status);
    this.router.navigate(["appareils"]);
  }
}
