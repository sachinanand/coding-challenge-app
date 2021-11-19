class CommonService {
  protected apiVersion: string = 'v1'
  public getEndpointUrl() {
    let url = `/${this.apiVersion}/phase?id=112`
    return url
  }
}

export default new CommonService()
