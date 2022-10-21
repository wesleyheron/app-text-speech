import { HttpResponse } from '../ports/http'
import { ServerError } from '../errors/server-error'

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data
  })

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error.message
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
})

export const serverError = (reason: string): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(reason)
})
