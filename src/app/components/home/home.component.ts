import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalData : GlobalDataSummary[];
  pieChart: GoogleChartInterface={
    chartType: 'PieChart'
  }
  columnChart: GoogleChartInterface={
    chartType: 'ColumnChart'
  }

  constructor(private dataService: DataServiceService) { }

initChart(caseType: string){

  let dataTable = [];
  dataTable.push(["country", "cases"])
  this.globalData.forEach(cs=>{
    let value : number;
    if(caseType == 'c')
    if(cs.confirmed > 2000)
    value = cs.confirmed

    if(caseType == 'd')
    if(cs.deaths > 2000)
    value = cs.deaths

    if(caseType == 'r')
    if(cs.recovered > 2000)
    value = cs.recovered

    if(caseType == 'a')
    if(cs.active > 2000)
    value = cs.active
    
    
    
        dataTable.push([  
          cs.country, value
        ])

  })


  this.pieChart = {
    chartType: 'PieChart',
    dataTable: dataTable,
    //firstRowIsData: true,
    options: {
      height: 500
    },
  };

  this.columnChart = {
    chartType: 'ColumnChart',
    dataTable: dataTable,
    //firstRowIsData: true,
    options: {
      height: 500
    },
  };

}


  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next: (result)=>{
          console.log(result);
          this.globalData = result;
          result.forEach(cs =>{
            if(!Number.isNaN(cs.confirmed)){
            this.totalActive+=cs.active
            this.totalRecovered+=cs.recovered
            this.totalDeaths+=cs.deaths
            this.totalConfirmed+=cs.confirmed
            }
          })
          this.initChart('c');
        }
      }
    )
  }

  updateChart(input: HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value)

  }

}
