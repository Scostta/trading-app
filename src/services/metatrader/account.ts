import { MetatraderAccount } from "metaapi.cloud-sdk";
import { api } from "./config";

export const getMetatraderAccounts = async (): Promise<Array<MetatraderAccount> | undefined> => {
  try {
    const accounts = await api.metatraderAccountApi.getAccounts()
    return accounts
  } catch (error) {
    console.error(`Metatrader: ${error}`)
    throw Error('Error al recuperar las cuentas de metatrader')
  }

}

export const connectMetatraderAccount = async (accountId: string): Promise<MetatraderAccount | undefined> => {
  try {
    const account = await api.metatraderAccountApi.getAccount(accountId);

    if (account.state !== 'DEPLOYED') {
      console.log('Deploying account');
      await account.deploy();
    } else {
      console.log('Account already deployed');
    }
    if (account.connectionStatus !== 'CONNECTED') {
      console.log('Waiting for API server to connect to broker (may take couple of minutes)');
      await account.waitConnected();
    }

    console.log('Connected');
    return account

  } catch (error) {
    console.error(`Metatrader: ${error}`)
    throw Error('Error al conectar la cuenta de metatrader')
  }
}