/* eslint-disable */
import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {     
    return this.appService.getAllReports(type)   
  }

  @Get('/:id')
  getReportById(
    @Param('type') type: ReportType, 
    @Param('id') id: string
  ) {
    return this.appService.getReportById(type, id)
  }

  // createReport(@Body() body: {amount: number; source: string}) {
  // body.amount -> destructuring...
  @Post()
  createReport(
    @Body() {amount, source}: {amount: number; source: string},
    @Param('type') type: ReportType
  ) {
     return this.appService.createReport(type, {amount, source})
  }

  @Put('/:id')
  updateReport( 
    @Param('type') type: ReportType, 
    @Param('id') id: string,
    @Body() body: {amount: number; source: string}) {

      // const report = data.report.find(r => r.id === id)
      // report.amount = body.amount
      // report.source = body.source
      // return report
      
      return this.appService.updateReport(type, id, body)
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteReport(@Param('id') id: string) {
    
    return this.appService.deleteReport(id)
  }
}
