import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService, TransitionSrviceService } from 'api';
import { status, transition } from 'model';
// import { send } from 'process';

// import { TransitionSrviceService } from 'projects/api/src/lib/service/transition-srvice.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {


  constructor(private statusService: StatusService, private TransitionSrvice: TransitionSrviceService, private formBuilder: FormBuilder) { }
  froma = ""
  V = 0
  adj: any[] = []
  // ...g.map(status =>{staus.name})
  // tap(resualt=>{})
  allStatus: status[] = []
  allStatusTo: status[] = []
  allTransition: transition[] = []
  formGroup: FormGroup = this.formBuilder.group({
    status: ['', Validators.required]
  })
  formGrouptransition: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    from: ['', Validators.required],
    to: ['', Validators.required]
  })
  formValid = this.formGrouptransition.valid
  ngOnInit(): void {
    this.formValid = this.formGroup.valid
    this.statusService.getAllStatus().subscribe(
      ans => {
        this.allStatus = ans
        this.allStatusTo = this.allStatus
      })
    this.TransitionSrvice.getAlltransition().subscribe(
      ans => {
        this.allTransition = ans
      })
  }

  change1() {
    this.allStatusTo = this.allStatus
    this.allStatusTo = this.allStatusTo.filter(s => s.name != this.formGrouptransition.value.from)
    this.formValid = this.formGrouptransition.valid
  }
  change2() {
    this.formValid = this.formGrouptransition.valid
  }
  onSubmit() {
    let init, final, orphan
    let check = this.allStatus.find(s => s.name == this.formGroup.value.status)
    if (this.allStatus.length == 0) {
      init = true
      final = true
      orphan = false
    }
    else {
      init = false
      final = true
      orphan = true
    }
    if (check == undefined) {
      let send: status = {
        name: this.formGroup.value.status,
        init: init,
        final: final,
        orphan: orphan,
      }
      this.statusService.addStatus(send).subscribe(
        ans => {
          // console.log(ans)
          this.formGroup.value.status = ''
          this.allStatus.push(send)
        }
      )
    }
    this.formGroup.reset()

  }
  onSubmittransition() {
    let check = this.allTransition.find(s => s.name == this.formGrouptransition.value.name)
    // console.log(check);

    if (check == undefined) {
      let send: transition = {
        name: this.formGrouptransition.value.name,
        from: this.formGrouptransition.value.from,
        to: this.formGrouptransition.value.to
      }
      this.TransitionSrvice.addTarnsition(send).subscribe(ans => {
        this.allTransition.push(send)
        this.formGrouptransition.reset()
        this.checkAllDetails()
      })

    }
    else
      return

  }
  reset() {
    this.statusService.deleteAllStatus().subscribe(ans => {
      this.TransitionSrvice.dalateAllDataStatus().subscribe(ans => {
        this.allStatus = []
        this.allTransition = []
      })
    })

  }
  checkAllDetails() {
    let send = {
      "name": '',
      "status": "",
      "bool": false,
    }
    this.allStatus.forEach(s => {
      if (this.allTransition.find(t => t.from == s.name) != undefined) {
        s.final = false
        send = {
          "name": s.name,
          "status": "final",
          "bool": false,
        }
        console.log(send);
        this.statusService.updateStatus(send).subscribe()
      }
      else {
        s.final = true
        send = {
          "name": s.name,
          "status": "final",
          "bool": true,
        }
        console.log(send);
        this.statusService.updateStatus(send).subscribe()
      }
    })

    this.adj = new Array();
    for (var i = 0; i < this.allStatus.length; i++)
      this.adj.push(new Array());

    this.allTransition.forEach(tr => {
      const v = this.allStatus.findIndex(t => t.name == tr.from)
      const w = this.allStatus.findIndex(t => t.name == tr.to)
      this.addEdge(v, w);
    })

    console.log('adj', this.adj);
    this.V = this.allStatus.length
    const u = this.allStatus.findIndex(s => s.init == true)
    this.allStatus.forEach(st => {
      const v = this.allStatus.findIndex(s => s.name == st.name)
      send.name = st.name
      send.status = "orphan"
      if (this.isReachable(u, v)) {
        console.log("There is a path from", u, "to", v)
        if (st.orphan == true) {
          st.orphan = false
          send.bool = false
          this.statusService.updateStatus(send).subscribe()
        }
      }
      else {
        // console.log("There is no path from", u, "to", v)
        if (st.orphan == false) {
          st.orphan = true
          send.bool = true
          this.statusService.updateStatus(send).subscribe()
        }
      }
    })


  }
  removeStatus(s: any) {
    let flag = true

    if (this.allStatus.find(r => r.name == s)?.init == true) {
      this.allStatus.forEach(st => {
        if (st.init == false && flag) {
          flag = false
          this.changeRadio(st.name)
        }
      })
    }
    this.allStatus.splice(this.allStatus.findIndex(r => r.name == s), 1)
    this.allTransition.forEach(tr => {
      if (tr.from == s || tr.to == s) {
        this.TransitionSrvice.deleteOneStatus({ name: tr.name }).subscribe(ans => {
          if (tr.from == s) {
            this.allTransition.splice(this.allTransition.findIndex(r => r.name == tr.from), 1)
          }
          if (tr.to == s) {
            this.allTransition.splice(this.allTransition.findIndex(r => r.name == tr.to), 1)
          }
        })
      }
    })
    this.statusService.deleteOneStatus({ name: s }).subscribe(ans => {
      this.checkAllDetails()
    })
  }
  removeTrans(s: any) {
    this.allTransition.forEach(tr => {
      if (tr.name == s) {
        this.allTransition.splice(this.allTransition.findIndex(r => r.name == s), 1)
        this.TransitionSrvice.deleteOneStatus({ name: s }).subscribe()
      }
    })
    this.checkAllDetails()
  }

  changeRadio(ev: any) {
    let flagInit = true, flagStatus = true
    this.allStatus.forEach(st => {
      if (st.init == true && flagInit) {
        st.init = false
        flagInit = false
        let send = {
          "name": st.name,
          "status": "init",
          "bool": false,
        }
        this.statusService.updateStatus(send).subscribe(ans => {
          send.status = "orphan"
          send.bool = st.orphan = true
          this.statusService.updateStatus(send).subscribe()
        })
      }
      if (flagStatus) { }
      let x
      if (typeof (ev) == 'object')
        x = ev.target.value
      else
        x = ev
      if (x == st.name && flagStatus) {
        st.init = true
        flagStatus = false
        let send2 = {
          "name": st.name,
          "status": "init",
          "bool": true,
        }
        this.statusService.updateStatus(send2).subscribe(ans => {
          send2.bool = st.orphan = false
          send2.status = "orphan"
          this.statusService.updateStatus(send2).subscribe(ans=>{
            this.checkAllDetails()
          })
        })
      }
    })


   

  }

  isReachable(s: any, d: any) {
    if (s == d)
      return true;
    // set all the vertices as not visited
    var visit= new Array(this.V).fill(false);
    // Create a queue for BFS
    var ezer = new Array();

    // set the current node as visited and queue it
    visit[s] = true;
    ezer.push(s);

    while (ezer.length != 0) {
      // Dqueue a vertex from ezer and print it
      s = ezer.pop();
      for (var i = 0; i < this.adj[s].length; i++) {
        // If this adjacent node is the destination node,
        // then return true
        if (this.adj[s][i] == d)
          return true;
        // Else, continue to do BFS
        if (!visit[this.adj[s][i]]) {
          visit[this.adj[s][i]] = true;
          ezer.push(this.adj[s][i]);
        }
      }
    }
    // If BFS is complete without visiting d 
    return false;
  }

  addEdge(v: any, w: any) {
    this.adj[v].push(w);
  }

}
