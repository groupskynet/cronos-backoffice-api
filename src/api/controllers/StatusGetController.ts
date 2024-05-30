import httpStatus from 'http-status'
import { Controller, Get, Route } from 'tsoa'

@Route('status')
export class StatusGetController extends Controller {
  constructor() {
    super()
  }

  @Get('/')
  run() {
    this.setStatus(httpStatus.OK)
  }
}
