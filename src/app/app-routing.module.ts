import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'wifi',
    loadChildren: () => import('./wifi/wifi.module').then( m => m.WifiPageModule)
  },
  {
    path: 'resister',
    loadChildren: () => import('./resister/resister.module').then( m => m.ResisterPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'off-state',
    loadChildren: () => import('./off-state/off-state.module').then( m => m.OffStatePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'sensors',
    loadChildren: () => import('./sensors/sensors.module').then( m => m.SensorsPageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'temperature-chart',
    loadChildren: () => import('./temperature-chart/temperature-chart.module').then( m => m.TemperatureChartPageModule)
  },
  {
    path: 'humidity-chart',
    loadChildren: () => import('./humidity-chart/humidity-chart.module').then( m => m.HumidityChartPageModule)
  },
  {
    path: 'voc-chart',
    loadChildren: () => import('./voc-chart/voc-chart.module').then( m => m.VocChartPageModule)
  },
  {
    path: 'dust-chart',
    loadChildren: () => import('./dust-chart/dust-chart.module').then( m => m.DustChartPageModule)
  },
  {
    path: 'filter-chart',
    loadChildren: () => import('./filter-chart/filter-chart.module').then( m => m.FilterChartPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
