class CommonService {
  protected apiVersion: string = 'v1'
  public getEndpointUrl(id: string) {
    let url = `/${this.apiVersion}/phase?id=${id}`
    return url
  }
}

export default new CommonService()
