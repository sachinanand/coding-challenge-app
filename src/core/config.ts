class AppConfig {
  readonly baseURL: string =
    process.env.REACT_APP_BASE_URL ?? 'https://api.production.com'
  readonly title = process.env.REACT_APP_PAGE_TITLE ?? 'Code-Challenge'
  readonly isProduction = process.env.NODE_ENV === 'production'
  readonly isDevelopment = process.env.NODE_ENV !== 'production'
  readonly version = process.env.REACT_APP_VERSION ?? 'development'
  readonly logEvents = process.env.LOG_EVENTS ?? false
}

export default new AppConfig()
