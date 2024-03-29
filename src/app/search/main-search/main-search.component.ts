import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MainSearchService } from './main-search.service';
import { collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const firebaseConfig = {
  apiKey: "AIzaSyB7ZIv9yI955npmzc5MSarDB4OJ75aM5p8",
  authDomain: "lccc-951e9.firebaseapp.com",
  databaseURL: "https://lccc-951e9-default-rtdb.firebaseio.com",
  projectId: "lccc-951e9",
  storageBucket: "lccc-951e9.appspot.com",
  messagingSenderId: "490603146752",
  appId: "1:490603146752:web:9667961e622f67770172e5",
  measurementId: "G-TEPQ8F3KYQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Component({
  selector: 'app-data',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'PolymerName',
    'FlowRate',
    'MolarMassRange',
    'ColumnName',
    'DOI',
    'Detectors',
    'Diameter',
    'ColumnLength',
    'InjectionVolume',
    'PoreSize',
    'Pressure',
    'Solvent',
    'Temperature'
  ];

  searchControl = new FormControl();

  column: string = "";

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 10;
  currentPage = 0;
  totalItems!: number;

  constructor(private dataService: MainSearchService) {}

  ngOnInit() {
    this.loadData();
    this.setupSearchControl();
  }
  async loadData() {
    const collectionRef = collection(db, 'PolymerData');
    const querySnapshot = await getDocs(collectionRef);

    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data); // Log the data to check if it's retrieved correctly

    this.dataSource = new MatTableDataSource(data);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.totalItems = data.length;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
  }

  setupSearchControl() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Add a debounce time to wait for user input
        distinctUntilChanged() // Only emit distinct values
      )
      .subscribe(searchTerm => {
        this.applyFilter(searchTerm);
      });
  }

  applyFilter(searchTerm: string) {
    const filterValue = searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

