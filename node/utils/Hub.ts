import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

const routes = {
  getAll: (pageNumber?: number, pageSize?: number) =>
    `https://logistics.vtexcommercestable.com.br/api/logistics/pvt/configuration/pickuppoints/_search?an=${
      process.env.VTEX_ACCOUNT
    }&page=${pageNumber ?? 1}&pageSize=${pageSize ?? 50}`,
  getByLocation: (
    postalCode: string,
    country: string,
    pageNumber?: number,
    pageSize?: number
  ) =>
    `https://${
      process.env.VTEX_ACCOUNT
    }.vtexcommercestable.com.br/api/checkout/pub/pickup-points?countryCode=${country}&postalCode=${postalCode}&page=${
      pageNumber ?? 1
    }&pageSize=${pageSize ?? 50}`,
}

export default class RequestHub extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Proxy-Authorization': context.authToken,
        Authorization: context.authToken,
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public getAllStores(data?: any) {
    return this.http.getRaw(routes.getAll(data))
  }

  public getByLocation(data?: any) {
    return this.http.getRaw(
      routes.getByLocation(
        data.postalCode,
        data.countryCode,
        data.pageNumber,
        data.pageSize
      )
    )
  }
}