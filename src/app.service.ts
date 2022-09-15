/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';

interface Report {amount: number, source: string}

@Injectable()
export class AppService {  
  getAllReports(type: ReportType) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType) 
  }
  getReportById(type: ReportType, id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    
    return data.report
      .filter((report) => report.type === reportType)
      .find(report => report.id === id)
  }

  // createReport(type: ReportType, body: {amount: number, source: string}) {
  createReport(type: ReportType, {amount, source}: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport)
    return newReport
  }
  updateReport(type: ReportType, id: string, body: Report) {

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    
    const reportToUpdate = data.report
      .filter(report => report.type === reportType)
      .find(report => report.id === id)

    if(!reportToUpdate) return 

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }
      
      return data.report[reportIndex]
  }

  deleteReport(id: string) {
    // data.report = data.report.filter(report => report.id !== id)
    const reportIndex = data.report.findIndex(repo => repo.id === id)
    
    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return
  }
}
