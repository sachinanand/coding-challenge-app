export interface ErrorDetails {
  message?: string
}

class ErrorHandling {
  log(e: any, details?: ErrorDetails) {
    console.group('APP ERROR')
    console.error(e)

    if (details) {
      console.error(details)
    }

    console.groupEnd()
  }
}

export default new ErrorHandling()
