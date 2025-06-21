import IClientService from './Interfaces/IClientService';
import { HttpClient, IHttpClient } from 'nauth-core';
import ClientService from './Impl/ClientService';

const httpClientAuth : IHttpClient = HttpClient();
httpClientAuth.init(import.meta.env.VITE_API_URL);

const clientServiceImpl : IClientService = ClientService;
clientServiceImpl.init(httpClientAuth);

const ServiceFactory = {
  ClientService: clientServiceImpl,
  setLogoffCallback: (cb : () => void) => {
    httpClientAuth.setLogoff(cb);
  }
};

export default ServiceFactory;