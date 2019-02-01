import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppareilService {
  appareilsSubject = new Subject<any[]>();
  private appareils: any[]; /*[
    {
      id: 1,
      name: "Machine à laver",
      status: "off"
    },

    {
      id: 2,
      name: "Frigo",
      status: "on"
    },

    {
      id: 3,
      name: "Ordinateur",
      status: "off"
    },
    {
      id: 4,
      name: "Télévision",
      status: "on"
    },
    {
      id: 5,
      name: "Cafetière",
      status: "off"
    }
  ];*/

  constructor(private httpClient: HttpClient) {}

  saveAppareilsToServer() {
    this.httpClient
      .put("https://appareils-db.firebaseio.com/appareils.json", this.appareils)
      .subscribe(
        () => {
          alert("Enregistrement réussi !");
        },
        error => {
          alert("Erreur : " + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>("https://appareils-db.firebaseio.com/appareils.json")
      .subscribe(
        response => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        error => {
          alert("Erreur ! : " + error);
        }
      );
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(s => {
      return s.id === id;
    });
    return appareil;
  }
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }
  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = "on";
    }
  }
  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = "off";
    }
  }
  switchOnOne(i: number) {
    this.appareils[i].status = "on";
  }
  switchOffOne(i: number) {
    this.appareils[i].status = "off";
  }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: "",
      status: ""
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
}
